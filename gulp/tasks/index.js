/* eslint-disable import/no-extraneous-dependencies */
const { series, parallel } = require('gulp');
const { runIMGTasks } = require('./images');
const copyHTML = require('./markup');
const { runJSTasks, runJSTasksDev } = require('./scripts');
const startServer = require('./server');
const { runCSSTasks, runCSSTasksDev } = require('./styles');
const runWatch = require('./watch');
const runDeploy = require('./deploy');

module.exports = {
  runTasksDev: series([
    parallel([runJSTasksDev, runCSSTasksDev, runIMGTasks, copyHTML]),
    startServer,
  ]),
  runTasksProd: series([parallel([runJSTasks, runCSSTasks, runIMGTasks, copyHTML]), startServer]),
  runWatch,
  runBuild: parallel([runJSTasks, runCSSTasks, runIMGTasks, copyHTML]),
  runDeploy,
};
