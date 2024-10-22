## Microservice Architecture Overview

## Microservice Logic in Our Application

In this project, we implemented a microservice architecture to isolate core functionalities into separate, autonomous services that can operate and scale independently. This setup enables cleaner code, easier debugging, and better maintainability. Each service is self-contained, runs in its own Docker container, and interacts with others through HTTP or WebSocket requests.

## Key Services and Components

1. Auth-Service:
Manages user authentication through JWT (JSON Web Tokens). It issues tokens during login, refreshes them when required, and blacklists tokens for logouts. The focus is entirely on authentication logic.

2. User-Service:
Handles user registration, profile management, and CRUD operations on user-related data. This service is decoupled from authentication, meaning it deals solely with user management, without managing sessions or tokens.

3. Chat-Service:
Facilitates real-time communication using WebSockets. It handles WebSocket connections, enabling users to join rooms and exchange messages in real-time. It also stores chat histories.

4. PostgreSQL Database:
A shared relational database used to persist user information, authentication data, and chat histories.

5. Redis Service:
This service is responsible for managing real-time connections for the WebSocket-based Chat-Service. Redis acts as an in-memory store for message brokering and maintaining channel layers for distributed systems, ensuring the chat service remains performant and scalable.

## How We Use Microservices

- Decoupling Responsibilities:
By breaking down each function (authentication, user management, chat, etc.) into separate services, we ensure each microservice is responsible only for its domain logic. This results in clean, maintainable code, where each microservice can be updated independently without affecting others.

- Redis Integration with Chat-Service:
Redis is used in the Chat-Service to handle real-time messaging through WebSocket connections. It helps manage chat room connections and message broadcasting efficiently by acting as a broker for WebSocket connections.

- Service Interaction:
All services are isolated but communicate through well-defined interfaces (HTTP/REST APIs or WebSockets). For example, Auth-Service handles authentication logic while User-Service manages user profiles. The Chat-Service uses Redis to handle real-time chat, making these microservices modular and independently scalable.

- Containerization:
Each service runs in a dedicated Docker container, ensuring isolation at the operating system level. This enhances deployment flexibility, allowing each microservice to be deployed, scaled, and maintained independently.

## Why We Used This Approach

1. Separation of Concerns:
Microservices allow us to organize our application into specific modules, each handling a single responsibility. This makes it easier to manage and reduces the complexity of adding new features or fixing bugs.

2. Scalability:
Each microservice can be scaled independently based on its resource needs. For example, the Chat-Service might need to scale more aggressively due to high traffic, while Auth-Service might not.

3. Independent Development and Deployment:
By decoupling services, development teams can work on different parts of the system simultaneously without stepping on each other's toes. This enables faster development cycles, quicker releases, and easier testing.

4. Fault Isolation:
If one service fails (for example, the Chat-Service), other services like Auth-Service or User-Service will continue to function without being affected.

5. Redis as a Real-Time Message Broker:
Redis is crucial for handling the scalability and performance of the WebSocket connections in the Chat-Service. It provides the distributed channel layers, allowing the chat rooms to scale and manage user connections efficiently.

## Conclusion

This architecture provides a solid foundation for building, scaling, and maintaining modern applications. It not only ensures flexibility and fault tolerance but also promotes best practices for developing modular, distributed systems.
