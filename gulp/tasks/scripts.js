/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const terser = require('gulp-terser');
const { scripts } = require('../config/paths');

const isDevelopment = process.env.NODE_ENV === 'development';

function cleanJS() {
  return src(`${scripts.output}/*`).pipe(clean());
}

function bundleJS() {
  return src(`${scripts.input}/*.js`)
    .pipe(
      webpack(
        {
          output: { filename: 'index.js' },
          devtool: isDevelopment ? 'inline-source-map' : false,
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env']],
                    plugins: ['@babel/plugin-transform-runtime'],
                  },
                },
              },
            ],
          },
        },
        compiler,
        (err) => {
          if (err) {
            console.error(`${err.name}: ${err.message}`);
          }
        }
      )
    )
    .pipe(dest(scripts.output));
}

function minifyJS() {
  return src(`${scripts.output}/*.js`).pipe(terser()).pipe(dest(scripts.output));
}

module.exports = {
  runJSTasksDev: series([cleanJS, bundleJS]),
  runJSTasks: series([cleanJS, bundleJS, minifyJS]),
  bundleJS,
};
