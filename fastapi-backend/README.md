# FastAPI Backend for Gargash Motors

This backend provides RESTful API services for the Gargash Motors application, replacing the previous Next.js API routes.

## Features

- Cars management (list, create, update, delete)
- Authentication (register, login, logout)
- Appointment scheduling
- AI assistant for car recommendations and customer service

## Requirements

- Python 3.9+
- MongoDB

## Setup

### Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Configure MongoDB connection:

By default, the application will connect to a MongoDB instance at `mongodb://localhost:27017`. 
You can customize this by setting the `MONGO_URI` and `DATABASE_NAME` environment variables.

### Running the application

Development mode:

```bash
./start.sh
```

Or manually:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Using Docker

The application can be run using Docker with the provided Dockerfile:

```bash
# Build the Docker image
docker build -t gargash-fastapi .

# Run the container
docker run -p 8000:8000 gargash-fastapi
```

Or using Docker Compose from the root directory:

```bash
docker-compose up
```

## API Documentation

Once the application is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development

The project structure follows FastAPI best practices:

- `app/main.py`: Main application entry point
- `app/api/routes/`: API route definitions
- `app/schemas/`: Pydantic models for request/response validation
- `app/db/`: Database connection and helpers
- `app/auth/`: Authentication related code