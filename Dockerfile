# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install serve to run a simple HTTP server
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=builder /app/dist /app/dist

# Expose the port your app runs on
EXPOSE 5173

# Command to run your app using serve
CMD ["serve", "-s", "dist", "-l", "5173"]
