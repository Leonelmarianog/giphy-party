const { runTasksDev, runTasksProd, runTasksBuild, runWatch } = require('./gulp/tasks');

const isDevelopment = process.env.NODE_ENV === 'development';

runWatch();

exports.build = runTasksBuild;
exports.default = isDevelopment ? runTasksDev : runTasksProd;
