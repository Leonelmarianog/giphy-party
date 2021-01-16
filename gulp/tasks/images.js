/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const { images } = require('../config/paths');

function cleanIMG() {
  return src(`${images.output}/*`).pipe(clean());
}

function copyIMG() {
  return src([
    `${images.input}/*.png`,
    `${images.input}/*.jpg`,
    `${images.input}/*.gif`,
    `${images.input}/*.ico`,
  ]).pipe(dest(images.output));
}

module.exports = {
  runIMGTasks: series([cleanIMG, copyIMG]),
};
