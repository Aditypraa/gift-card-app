export default {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/src/tests/**/*.test.js', '**/src/tests/**/*.test.jsx'],
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
