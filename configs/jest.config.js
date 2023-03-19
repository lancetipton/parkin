const path = require('path')
const ROOT_DIR = path.join(__dirname, '../')

module.exports = {
  maxWorkers: 1,
  preset: "es-jest",
  rootDir: ROOT_DIR,
  testMatch: [
    '<rootDir>/src/**/__tests__/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: "reports/coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/__mocks__",
    "<rootDir>/src/__tests__",
    "<rootDir>/src/types",
    "<rootDir>/src/bin/testCli.ts",
    "<rootDir>/src/bin/parkin.js",
    "<rootDir>/src/bin/parkin.ts",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    '!src/**/index.*'
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'es6', `ts`, `tsx`, `cjs`, `ejs` ],
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: [`<rootDir>/configs/setupTests.js`],
}
