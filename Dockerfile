FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files (including .env.local if present in build context)
COPY . .

# Copy .env.local explicitly (optional if it's already included above)
# COPY .env.local .env

# Build Next.js app
RUN npm run build

# Final lightweight image
FROM node:18-alpine

WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app ./

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
