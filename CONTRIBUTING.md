# Contributing to Gargash Motors AI Assistant

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Development Workflow

1. **Fork and Clone**
   - Fork the repository on GitHub
   - Clone your fork locally: `git clone <your-fork-url>`
   - Add the original repo as upstream: `git remote add upstream <original-repo-url>`

2. **Branch**
   - Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
   - Use descriptive branch names (e.g., `feature/add-login`, `bugfix/fix-search`)

3. **Code**
   - Follow the project's coding style and conventions
   - Write clean, readable, and well-documented code
   - Use meaningful commit messages

4. **Test**
   - Test your changes thoroughly
   - Make sure the application still works as expected

5. **Submit Pull Request**
   - Push your changes to your fork: `git push origin feature/your-feature-name`
   - Open a pull request from your branch to the main repository
   - Provide a clear description of your changes

## Project Structure

The project is a Next.js application with the following structure:

- `app/` - Next.js application routes and pages
- `components/` - Reusable UI components
- `lib/` - Utility functions, authentication, and database connection
- `models/` - MongoDB schemas
- `public/` - Static assets
- `scripts/` - Database seeding scripts

## Running the Project

1. Make sure you have Node.js and MongoDB installed
2. Install dependencies: `cd next-app && npm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run the development server: `npm run dev`

## MongoDB

You can run MongoDB locally using:
- Direct installation on your machine
- Docker: `docker-compose up mongodb`

## Coding Standards

- Use TypeScript for type safety
- Follow the Next.js App Router conventions
- Use functional components with React hooks
- Follow the existing project structure

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update documentation if necessary
3. Your PR should focus on a single feature or bugfix
4. The PR will be reviewed by at least one team member before merging