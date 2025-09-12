import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useESM: false,
        tsconfig: {
          target: 'es2020',
          module: 'commonjs'
        }
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'allure-jest/node',
  testTimeout: 60_000,
  testEnvironmentOptions: {
    resultsDir: 'reports/allure-results',
  },
  setupFiles: ['dotenv/config'],
};

export default config;
