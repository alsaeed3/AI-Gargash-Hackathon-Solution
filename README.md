# AI Gargash Hackathon Solution

This project includes a React frontend and Express backend with MongoDB for the Gargash AI Hackathon.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Clone the Repository

```bash
git clone [your-repository-url]
cd AI-Gargash-Hackathon-Solution
```

### Run with Docker Compose

To start the application with MongoDB:

```bash
docker-compose up
```

This will:
1. Start a MongoDB container
2. Start the server (backend) container
3. Start the client (frontend) container

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### Run without Docker (Alternative)

If you prefer to run the application without Docker:

1. **Set up MongoDB**
   - Install and start MongoDB on your machine
   - Create a database named `gargash-ai-assistant`

2. **Start the server**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Start the client**
   ```bash
   cd client
   npm install
   npm start
   ```

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend application with MongoDB connection

## API Endpoints

- `/api/cars` - Car information endpoints
- `/api/ai` - AI assistant endpoints
- `/api/appointments` - Test drive appointment endpoints

## Environment Variables

You can customize the application using environment variables:

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string (default: mongodb://localhost:27017/gargash-ai-assistant)