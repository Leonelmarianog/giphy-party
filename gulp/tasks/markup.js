/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const { markup } = require('../config/paths');

function copyHTML() {
  return src(`${markup.input}/index.html`).pipe(dest(markup.output));
}

module.exports = copyHTML;
