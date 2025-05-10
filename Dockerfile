# Start from a lightweight official Node.js image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

# Install dependencies (use npm install here to support optional scripts if needed)
RUN npm install --production

# Copy the rest of the app code
COPY . .

# Build the application (optional — uncomment if needed, e.g., for Next.js or TypeScript)
# RUN npm run build

# Expose the port your app listens on (change if it's not 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
