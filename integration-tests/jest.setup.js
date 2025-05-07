// Increase timeout for all tests to account for network requests
jest.setTimeout(30000);

// Global before all tests
beforeAll(async () => {
  console.log('Starting integration tests...');
  // You could add checks here to make sure services are running
});

// Global after all tests
afterAll(async () => {
  console.log('Finished integration tests');
});