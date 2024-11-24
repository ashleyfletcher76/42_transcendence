# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and install dependencies inside the container
COPY package.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the WebSocket server port
EXPOSE 8888

# Start the server
CMD ["npm", "start"]
