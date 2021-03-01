module.exports = {
  parser: 'babel-eslint',
  root: true,
  ignorePatterns: [
    'build/',
  ],
  globals: {
    jest: true,
    __DEV__: true,
    expect: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {},
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['plugin:jest/recommended'],
  settings: {},
  rules: {
    /* General */
    'no-console': [ 'warn', { allow: [ 'warn', 'error' ] }],
    'brace-style': [ 'error', 'stroustrup' ],
    indent: [ 'error', 2, { offsetTernaryExpressions: true }],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'id-length': [
      'error',
      {
        min: 2,
        exceptions: [ 'y', 'x', 'i', 'e', '_', 'k', 'p', 'P', 'I' ],
      },
    ],
    'one-var': [ 'error', 'never' ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'newline-per-chained-call': 2,
    'array-bracket-spacing': [
      'error',
      'always',
      {
        arraysInArrays: false,
        singleValue: false,
        objectsInArrays: false,
      },
    ],
    'space-in-parens': [ 'error', 'never' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '_|__|checkDocString|checkDataTable|checkBackground',
      },
    ],
    /* Jest */
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/no-mocks-import': 0,
    'jest/no-export': 0,
  },
}
