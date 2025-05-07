# Testing Documentation

This document outlines the testing strategy for the Gargash Motors application, which consists of a FastAPI backend and a Next.js frontend.

## Overview

The application uses the following testing frameworks:

- **Backend (FastAPI)**: pytest
- **Frontend (Next.js)**: Jest + React Testing Library

## Backend Testing

### Setup

Backend tests are located in the `fastapi-backend/tests/` directory. The tests use pytest with async support to test the FastAPI routes.

### Running Backend Tests

To run the backend tests:

```bash
cd fastapi-backend
pytest
```

For more verbose output:

```bash
pytest -v
```

To run specific test files:

```bash
pytest tests/test_cars.py
```

### Test Coverage

Backend tests cover:
- API routes functionality
- Authentication
- Car management operations
- Appointment scheduling
- AI assistant responses

## Frontend Testing

### Setup

Frontend tests are located in the `next-app/__tests__/` directory and use Jest with React Testing Library.

### Running Frontend Tests

To run the frontend tests:

```bash
cd next-app
npm test
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

To run specific test files:

```bash
npm test -- __tests__/components/button.test.tsx
```

### Test Coverage

Frontend tests cover:
- UI components
- API client functionality
- Page components
- Data fetching and state management

## Integration Testing

Integration tests verify that the FastAPI backend and Next.js frontend work together correctly. These can be executed by:

1. Starting both services:
   ```bash
   docker-compose up
   ```

2. Running integration tests:
   ```bash
   cd integration-tests
   npm test
   ```

## Continuous Integration

All tests are automatically run in CI/CD pipelines when pushing to the repository. The pipeline includes:

1. Running backend tests
2. Running frontend tests
3. Linting code
4. Building the application

## Adding New Tests

### Backend Test Guidelines

1. Create test files in `fastapi-backend/tests/`
2. Use the test fixtures defined in `conftest.py`
3. Follow the structure of existing tests
4. Make use of async/await for database operations

### Frontend Test Guidelines

1. Place component tests in `next-app/__tests__/components/`
2. Place page tests in `next-app/__tests__/app/`
3. Place utility tests in `next-app/__tests__/lib/`
4. Use the `test-utils.tsx` helper for rendering components