# ---------- Stage 1: Install and Build ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (separate layer for cache)
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the app
RUN npm run build

# ---------- Stage 2: Run Production ----------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Only copy necessary files from the builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./


# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
