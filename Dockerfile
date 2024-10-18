# Use the official Node.js image.
FROM node:20

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your application files.
COPY . .

# Expose the port your app runs on.
EXPOSE 3600

# Command to run your app.
CMD ["node", "server.js"]
