FROM node:14

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port number
EXPOSE 80

# Start Nginx and the application
CMD [ "nginx", "-g", "daemon off;", "npm", "start" ]
