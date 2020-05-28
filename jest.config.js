/**
 * @typedef {import('ts-jest')}
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/util.ts'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      tsConfig: 'tsconfig.json',
    },
  },
  preset: 'ts-jest',
  resetMocks: true,
  roots: ['<rootDir>'],
  testEnvironment: '<rootDir>/test/TestEnvironment.js',
};
