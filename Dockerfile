FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Copy env file for Firestore
COPY .env.local .env

# Build Next.js app
RUN npm run build

# Final image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
