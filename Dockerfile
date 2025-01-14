FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", “run” ,"start"] # will launch the remix app when we run this Docker image.