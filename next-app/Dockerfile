FROM node:18-alpine

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm ci

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Run in development mode (skips production build)
CMD ["npm", "run", "dev", "--", "-p", "3000"]