/* eslint-disable import/no-extraneous-dependencies */
const { watch } = require('gulp');
const { runIMGTasks } = require('./images');
const copyHTML = require('./markup');
const { runJSTasks, runJSTasksDev } = require('./scripts');
const { runCSSTasks, runCSSTasksDev } = require('./styles');

const isDevelopment = process.env.NODE_ENV === 'development';
const isBuild = process.env.IS_BUILD;

function runWatch() {
  if (isBuild) {
    return;
  }

  watch(
    ['./src/sass/**/*.scss', './src/sass/**/*.css'],
    { usePolling: true },
    isDevelopment ? runCSSTasksDev : runCSSTasks
  );
  watch(
    ['./src/img/*.png', './src/img/*.jpg', './src/img/*.gif', './src/img/*.ico'],
    { usePolling: true },
    runIMGTasks
  );
  watch(
    ['./src/js/**/*.js', '!./src/js/**/*.test.js'],
    { usePolling: true },
    isDevelopment ? runJSTasksDev : runJSTasks
  );
  watch('./index.html', { usePolling: true }, copyHTML);
}

module.exports = runWatch;
