/* eslint-disable import/no-extraneous-dependencies */
const { defaults } = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: ['fixtures', 'cypress'],
  coveragePathIgnorePatterns: ['fixtures', 'cypress'],
};
