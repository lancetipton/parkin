const path = require('path')
const ROOT_DIR = path.join(__dirname, '../')

module.exports = {
  maxWorkers: 1,
  rootDir: ROOT_DIR,
  preset: 'rollup-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    `<rootDir>/src/**/__tests__/**/*.js?(x)`
  ],
  coverageDirectory: "reports/coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/__mocks__",
    "<rootDir>/src/__tests__"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  moduleFileExtensions: [ 'js', 'json', 'jsx', 'es6' ],
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: [`<rootDir>/configs/setupTests.js`],
}
