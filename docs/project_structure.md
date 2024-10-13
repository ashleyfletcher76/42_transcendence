## Project Structure(at the beginning)

Open to be changed but beginning structure and why

```plaintext
transcendence/
│
├── backend/                      # Backend code (Django application)
│   ├── api/                      # Core API functionality
│   │   ├── users/                # User registration, login, profiles
│   │   ├── pong/                 # Server-side game logic (Pong)
│   │   ├── auth/                 # OAuth and 2FA logic
│   │   └── chat/                 # Live chat functionality
│   │
│   ├── services/                 # Microservices (optional) for scalability
│   │   ├── user_service/         # Microservice for user management
│   │   ├── game_service/         # Microservice for game logic (Pong)
│   │   └── chat_service/         # Microservice for chat
│   │
│   ├── config/                   # Django settings and configurations
│   │   ├── settings/
│   │   │   ├── base.py           # Shared settings across environments
│   │   │   ├── dev.py            # Development-specific settings
│   │   │   ├── prod.py           # Production-specific settings
│   │   │   └── logging.py        # Logging configuration
│   │   └── urls.py               # URL routing for all APIs
│   │
│   ├── db/                       # Database-related files (migrations, seeds)
│   │   ├── migrations/           # Django migrations for database
│   │   └── seeds.py              # Initial data for the database (optional)
│   │
│   ├── tests/                    # Unit and integration tests for the backend
│   │   ├── unit/                 # Unit tests for individual components
│   │   └── integration/          # Integration tests for the whole system
│   │
│   └── manage.py                 # Django's management script
│
├── docker/                       # Docker-related configuration and scripts
│   ├── Dockerfile                # Dockerfile for the backend (Django app)
│   ├── postgres/                 # Custom PostgreSQL setup (optional)
│   │   └── init.sql              # Custom SQL scripts to initialize the database
│   └── docker-compose.yml        # Docker Compose configuration for orchestrating backend and database
│
├── docs/                         # Documentation related to backend
│   └── API_Documentation.md      # API documentation for backend
│
├── scripts/                      # Helpful scripts for managing tasks
│   ├── dev_setup.sh              # Script for setting up the development environment
│   └── wait_for_db.sh            # Script to wait for the database to be ready before backend starts
│
├── .env                          # Environment variables (DB credentials, secret keys)
└── requirements.txt              # Python dependencies for backend (Django, PostgreSQL)
```
