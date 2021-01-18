/* eslint-disable import/no-extraneous-dependencies */
const { src } = require('gulp');
const ghPages = require('gulp-gh-pages');
const { execSync } = require('child_process');

function getGitCommitHash() {
  return execSync('git rev-parse HEAD').toString().trim();
}

function deploy() {
  return src('./dist/**/*').pipe(
    ghPages({ message: `Deploy to GitHub Pages: ${getGitCommitHash()} --skip-ci` })
  );
}

module.exports = deploy;
