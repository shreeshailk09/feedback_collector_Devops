# =====================
# Stage 1: Dependencies & Build
# =====================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build tools for native modules if needed (optional but safe)
RUN apk add --no-cache python3 make g++

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Install dependencies (this layer will be cached unless package files change)
RUN npm install

# Copy full source
COPY . .

# Build the Next.js app
RUN npm run build

# =====================
# Stage 2: Runtime
# =====================
FROM node:18-alpine

WORKDIR /app

# Copy only what's needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
