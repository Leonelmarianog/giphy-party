/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const cleancss = require('gulp-clean-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const noop = require('gulp-noop');
const autoprefixer = require('gulp-autoprefixer');
const { styles } = require('../config/paths');

const isDevelopment = process.env.NODE_ENV === 'development';

function cleanCSS() {
  return src(`${styles.output}/*`).pipe(clean());
}

function compileSASS() {
  return src(`${styles.input}/**/*.scss`)
    .pipe(isDevelopment ? sourcemaps.init() : noop())
    .pipe(sass().on('error', sass.logError))
    .pipe(isDevelopment ? sourcemaps.write() : noop())
    .pipe(dest(styles.output));
}

function prefixCSS() {
  return src(`${styles.output}/*.css`)
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(styles.output));
}

function minifyCSS() {
  return src(`${styles.output}/*.css`)
    .pipe(
      cleancss({ debug: true }, (details) => {
        console.log(`${details.name}: Original Size -> ${details.stats.originalSize}`);
        console.log(`${details.name}: Minified Size -> ${details.stats.minifiedSize}`);
      })
    )
    .pipe(dest(styles.output));
}

function copySASS() {
  return src([`${styles.input}/**/*.scss`, `${styles.input}/**/*.css`]).pipe(dest(styles.output));
}

module.exports = {
  runCSSTasksDev: series([cleanCSS, compileSASS, copySASS]),
  runCSSTasks: series([cleanCSS, compileSASS, prefixCSS, minifyCSS]),
};
