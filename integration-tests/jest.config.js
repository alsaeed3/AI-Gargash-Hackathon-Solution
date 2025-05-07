module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  verbose: true,
  testTimeout: 30000, // Longer timeout for integration tests
  setupFilesAfterEnv: ['./jest.setup.js']
};