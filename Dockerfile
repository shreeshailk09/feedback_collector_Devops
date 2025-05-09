# Step 1: Use Node image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependencies files and install
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the code
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose the app port
EXPOSE 3000

# Step 7: Start the app
CMD ["npm", "start"]
