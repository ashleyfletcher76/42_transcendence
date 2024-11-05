## Microservice Architecture Overview
This project employs a microservice architecture to break down core functionalities into independent, specialized services. Each service operates in its own container and communicates over HTTP, WebSocket, or proxied connections. The architecture aims to improve code maintainability, scalability, and fault tolerance, with services that can be developed, scaled, and deployed independently.

## Table of Contents
- [Microservice Logic in Our Application](#microservice-logic-in-our-application)
  - [Key Services and Components](#key-services-and-components)
- [NGINX Reverse Proxy and HTTPS Redirection](#nginx-reverse-proxy-and-https-redirection)
- [Health Check Mechanism](#health-check-mechanism)
- [Self-Signed SSL Certificate Creation](#self-signed-ssl-certificate-creation)
- [Microservices and Reverse Proxy Benefits](#microservices-and-reverse-proxy-benefits)
- [Updated NGINX Configuration ](#updated-nginx-configuration)
- [Summary](#summary)

## Microservice Logic in Our Application

Our architecture now includes enhanced routing, security, and health-check mechanisms, with NGINX acting as a reverse proxy to manage traffic between the frontend, backend, and individual services.

### Key Services and Components

1. Auth-Service:
* Manages authentication using JSON Web Tokens (JWTs).
* Handles login, logout (via token blacklisting), and token refresh operations, ensuring that only valid tokens are used for user authentication.

2. User-Service:
* Handles user registration, profile management, and CRUD operations on user-related data, keeping these operations separate from authentication.

3. Chat-Service:
* Enables real-time communication via WebSockets, allowing users to join chat rooms and exchange messages in real-time.
* Utilizes Redis as an in-memory store to manage message brokering and channel layers, ensuring scalable performance for high-traffic messaging.

4. PostgreSQL Database:
* A shared relational database that stores user data, authentication information, and chat history.

5. Redis Service:
* Acts as a message broker for the Chat-Service, facilitating real-time message broadcasting and managing WebSocket connections through a distributed channel layer.

6. Frontent (Static Assets):
* Deployed through NGINX, which serves the built frontend files.
* Ensures secure access by enforcing HTTPS and redirects HTTP traffic to HTTPS for secure client-server communication.

7. NGINX Reverse Proxy:
* Acts as a central gateway that routes incoming requests to the appropriate backend services.
* Enforces HTTPS connections using a self-signed SSL certificate generated at container startup, ensuring secure communication between the client and server.

## NGINX Reverse Proxy and HTTPS Redirection

NGINX is configured as a reverse proxy to handle requests securely between the frontend and backend services. Here’s how it fits into our microservice architecture:

1. HTTPS Enforcement and Redirection:
* NGINX serves as a reverse proxy, ensuring all incoming connections use HTTPS.
* It listens for HTTP requests and redirects them to HTTPS, establishing a secure communication channel.
* A self-signed SSL certificate is generated automatically on startup, simplifying certificate management in development environments.

2. Reverse Proxy for Service Routing:
* Requests to specific endpoints (e.g., /auth, /user, /chat) are routed to the appropriate backend service.
* This routing is configured in the nginx.conf file, allowing NGINX to direct traffic based on the URL path.
* By isolating service-specific requests, each microservice remains self-contained while allowing inter-service communication through NGINX.

3. Frontend Service Integration:
* The static assets of the frontend application are served directly by NGINX, ensuring efficient delivery to the client.
* The frontend interacts with the backend microservices via NGINX, which routes requests based on predefined paths, keeping the communication secure and streamlined.

## Health Check Mechanism

1. Purpose and Implementation:
* A health check endpoint (/health) is added to each service, allowing us to monitor the service’s availability and functionality.
* NGINX or the orchestrator (e.g., Docker Compose) periodically checks these endpoints to confirm service health, improving fault tolerance and simplifying debugging.

2. Health Check Workflow:
* The health_check function for each service confirms the database connection and readiness status.
* For example, the Chat-Service confirms Redis connectivity and database availability, responding with status: ok if healthy.
* This setup allows NGINX to identify failing services, making it easier to isolate and resolve issues without impacting other components.

## Self-Signed SSL Certificate Creation

1. Automatic SSL Generation:
* During the NGINX container initialization, a self-signed SSL certificate is generated. This ensures HTTPS is available without needing pre-existing certificates, ideal for development.
* The certificate and key are stored within the /etc/nginx/ssl directory, used to establish secure connections between the client and the NGINX server.

2. Security Measures with Self-Signed Certificates:
* While self-signed certificates lack third-party validation, they still enable secure encrypted communication between the client and server.
* The use of HTTPS ensures data integrity and protection from man-in-the-middle attacks, even in development environments.

## Updated NGINX Configuration

The nginx.conf file now includes the following enhancements:

* SSL/TLS Configuration: Configures NGINX to use the self-signed certificate and enforces HTTPS on all incoming requests.
* HTTP to HTTPS Redirection: Redirects any HTTP traffic to HTTPS, ensuring secure access across all services.
* Reverse Proxy Rules: Routes requests to appropriate services based on URL paths (e.g., /auth for the Auth-Service). These rules ensure each service can be reached securely and efficiently.
* Static File Serving: Configures NGINX to serve frontend assets directly, reducing the load on backend services and improving response times.

## Microservices and Reverse Proxy Benefits

1. Enhanced Security:
* NGINX enforces HTTPS and redirects HTTP to HTTPS, ensuring secure data exchange.
* The self-signed certificate generation simplifies SSL setup for development, making the entire architecture HTTPS-compliant.

2. Improved Scalability and Performance:
* By decoupling each service and integrating Redis for real-time messaging, the architecture supports individual scaling needs. High-demand services (e.g., Chat-Service) can scale independently, optimizing resources.

3. Robust Fault Isolation and Health Checks:
* The health check endpoints allow for real-time service monitoring, quickly isolating failures without impacting other services.
* Fault isolation ensures that if one service fails, others (like Auth-Service and User-Service) remain operational.

4. Seamless Inter-Service Communication:
* Through NGINX, each service communicates with others in a secure, standardized manner, maintaining consistent behavior across requests.
* This simplifies debugging and enhances overall system modularity.

5. Simplified Certificate Management:
* Automated SSL generation reduces the setup time and complexity for secure connections, especially in testing environments.

## Summary

This architecture ensures a modular, secure, and scalable system by integrating a reverse proxy, HTTPS enforcement, and dedicated health checks. The system is designed for rapid iteration, fault tolerance, and efficient communication between frontend and backend services, making it suitable for modern, distributed applications.
