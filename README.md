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
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Gargash-Hackathon-Solution
   ```

2. **Install dependencies**
   ```bash
   cd next-app
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the `next-app` directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/gargash-cars
   JWT_SECRET=your-secret-key-should-be-in-env
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**  
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

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

## MongoDB Setup

You can either:
1. Use a local MongoDB instance running on port 27017
2. Use MongoDB Atlas by updating the MONGODB_URI in your .env.local file

## Docker Support (Optional)

For those who prefer Docker, you can use the Docker Compose file to run only the MongoDB service:

```bash
# Run only the MongoDB service
docker-compose up mongodb
```

## Contributors

- [Your Name]
- [Team Member Names]