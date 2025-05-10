# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to utilize Docker cache
COPY package*.json ./

# Install npm dependencies (this layer will be cached unless package*.json changes)
RUN npm ci --prefer-offline --no-audit --production

# Now, copy the rest of the application code
COPY . .

# Build your application (only if needed, if you're running a build step like with Next.js)
RUN npm run build

# Expose the port your app will be running on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
