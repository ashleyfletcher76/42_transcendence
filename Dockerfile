FROM nginx:latest

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy your API server's self-signed certificate to Nginx
COPY server.crt /etc/ssl/certs/server.crt

# Copy the built Ember app from Stage 1
COPY dev/ember-project/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]