const path = require('path')
const parkinRoot = path.join(__dirname, '../')
const featureTransform = path.join(parkinRoot, './jest/transformer.js')
const parkinEnvSetup = path.join(parkinRoot, './jest/setupTestEnvironment.js')

module.exports = {
  // Set maxWorkers to 1 so tests are run synchronously
  maxWorkers: 1,
  moduleFileExtensions: [
    // Includes the feature file extension
    'feature',
  ],
  setupFilesAfterEnv: [
    parkinEnvSetup,
  ],
  transform: {
    // Add the default babel-jest for js files
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // Add the custom parkin transformer for feature files
    '^.*\\.feature': featureTransform
  },
  testMatch: [
    '<rootDir>/**/*.feature',
  ],
}