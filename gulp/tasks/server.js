/* eslint-disable import/no-extraneous-dependencies */
const { src } = require('gulp');
const webserver = require('gulp-webserver');
const { publicRoot } = require('../config/paths');

function startServer() {
  return src(publicRoot).pipe(webserver({ livereload: true, open: false }));
}

module.exports = startServer;
