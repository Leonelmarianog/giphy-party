const { runTasksDev, runTasksProd, runWatch, runBuild, runDeploy } = require('./gulp/tasks');

const isDevelopment = process.env.NODE_ENV === 'development';

runWatch();

exports.deploy = runDeploy;
exports.build = runBuild;
exports.default = isDevelopment ? runTasksDev : runTasksProd;
