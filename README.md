# Gargash Motors AI Assistant - Hackathon Solution

A Next.js application for Gargash Motors featuring an AI assistant for car recommendations and a luxury car showroom interface.

## Project Overview

This project is a luxury car dealership web application with an integrated AI assistant built for the AI Gargash Hackathon. The application allows users to:
- Browse luxury vehicles
- Get AI-powered car recommendations
- View detailed car information
- Schedule test drives
- Use an AI assistant for personalized help

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI (primary backend), Next.js API Routes (legacy)
- **Database**: MongoDB
- **Authentication**: JWT

## Running the Application

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Option 1: Using Docker Compose (Recommended)

The easiest way to run the entire application:

```bash
# Start all services (MongoDB, FastAPI backend, Next.js frontend)
docker-compose up
# or
# in case you're using Docker Desktop:
docker compose up
```

Once running, access:
- Frontend: http://localhost:3000
- FastAPI backend: http://localhost:8000
- API documentation: http://localhost:8000/docs

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Gargash-Hackathon-Solution
   ```

2. **Setup the FastAPI Backend**
   ```bash
   # Install Python dependencies
   cd fastapi-backend
   pip install -r requirements.txt
   
   # Start the FastAPI server
   ./start.sh
   ```

3. **Setup the Next.js Frontend**
   ```bash
   # Install dependencies
   cd next-app
   npm install
   
   # Run the development server
   npm run dev
   ```

4. **Environment Setup**
   Create a `.env.local` file in the `next-app` directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/gargash-cars
   JWT_SECRET=your-secret-key-should-be-in-env
   API_BASE_URL=http://localhost:8000/api
   ```

5. **Seed the database**
   ```bash
   cd next-app
   npm run seed
   ```

## Testing the Application

We have a comprehensive testing suite covering the backend, frontend, and integration tests.

### Running All Tests

From the project root:

```bash
# Install all dependencies first
npm run setup

# Run all tests (backend, frontend, and integration)
npm test
```

### Running Specific Tests

```bash
# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend  

# Integration tests only
npm run test:integration
```

### Test Coverage Reports

After running tests, coverage reports will be available:
- Backend: `fastapi-backend/htmlcov/index.html`
- Frontend: `next-app/coverage/lcov-report/index.html`

For more detailed testing information, see [TESTING.md](./TESTING.md).

## Project Structure

- `fastapi-backend/` - FastAPI backend service
- `next-app/` - Next.js frontend application
- `integration-tests/` - End-to-end tests
- `app/` - Next.js application routes and pages
- `components/` - Reusable UI components
- `lib/` - Utility functions, authentication, and database connection
- `models/` - MongoDB schemas
- `public/` - Static assets
- `scripts/` - Database seeding scripts

## Key Features

- **AI Assistant**: Natural language interface for car recommendations
- **Car Browsing**: Filter and view detailed information about luxury vehicles
- **Responsive Design**: Works on mobile and desktop devices
- **Test Drive Scheduling**: Book appointments to test drive vehicles

## API Documentation

When the FastAPI backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## MongoDB Setup

You can either:
1. Use a local MongoDB instance running on port 27017
2. Use MongoDB Atlas by updating the MONGODB_URI in your .env.local file

## Docker Support

The application is fully containerized:

```bash
# Run all services
docker-compose up

# Run only the MongoDB service
docker-compose up mongodb

# Run only the backend
docker-compose up fastapi-backend

# Run only the frontend
docker-compose up next-frontend
```

## Contributors

Team: BlueEdge
- Ali Saeed
- Ahmed Salem
- Aarif
- Mohammed Khedr
- Simon