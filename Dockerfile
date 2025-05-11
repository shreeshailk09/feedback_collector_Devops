# Step 1: Build the app
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --verbose

# Copy the app files
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app
FROM node:18

WORKDIR /app

# Copy build output from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm prune --production


# Start the app
CMD ["npm", "run", "start"]

EXPOSE 3000
