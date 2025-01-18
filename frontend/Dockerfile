FROM nginx:latest

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx_dev.conf /etc/nginx/nginx.conf

# generate a self signed SSL certificate
RUN mkdir -p /etc/nginx/ssl && \
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/nginx/ssl/key.pem \
		-out /etc/nginx/ssl/cert.pem \
		-subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

# Copy the built Ember app from Stage 1
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
