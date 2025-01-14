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

# Copy dependencies and build artifacts from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/remix.config.js ./remix.config.js - Seems to be name after v7 but we dont have it?

ENV NODE_ENV=production

CMD ["npm", “run” ,"start"] # will launch the remix app when we run this Docker image.