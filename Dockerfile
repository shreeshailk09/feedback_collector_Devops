# Step 1: Build the app
FROM node:16 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the app files
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app
FROM node:16

WORKDIR /app

# Copy build output from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --production

# Start the app
CMD ["npm", "run", "start"]

EXPOSE 3000
