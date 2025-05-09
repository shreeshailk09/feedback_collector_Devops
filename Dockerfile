# Step 1: Use a stable base image
FROM node:18-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies first for Docker caching
COPY package*.json ./

# Optional: faster, cleaner install if you have package-lock.json
RUN npm ci --no-optional --prefer-offline --verbose

# Step 4: Copy the rest of the application
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose the app port
EXPOSE 3000

# Step 7: Start the app
CMD ["npm", "start"]
