# backend/Dockerfile

# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend code to the container
COPY . .

# Expose the port your backend runs on (e.g., 5000)
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]