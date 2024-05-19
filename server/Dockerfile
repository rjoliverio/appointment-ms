# Stage 1: Build
FROM node:20.11.0-bullseye AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install ts-node typescript --save-dev

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Stage 2: Production Image
FROM node:20.11.0-alpine AS runner

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production
RUN npm install ts-node typescript --save-dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy Prisma schema and generate client
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3030

# Command to run migrations, seed the database, and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node dist/src/main.js"]
