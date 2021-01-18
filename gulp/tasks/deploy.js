/* eslint-disable import/no-extraneous-dependencies */
const { src } = require('gulp');
const ghPages = require('gulp-gh-pages');

function deploy() {
  return src('./dist/**/*').pipe(ghPages());
}

module.exports = deploy;
