const path = require('path')
const ROOT_DIR = path.join(__dirname, '../')
console.log(ROOT_DIR)

module.exports = {
  rootDir: ROOT_DIR,
  preset: 'rollup-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    `<rootDir>/src/**/__tests__/**/*.js?(x)`
  ],
  collectCoverageFrom: [`<rootDir>/src/index.js`],
  moduleFileExtensions: [ 'js', 'json', 'jsx', 'es6' ],
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: [`<rootDir>/configs/setupTests.js`],
}
