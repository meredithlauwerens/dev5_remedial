# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Code of Conduct documentation for community contributors
- Contribution guidelines for developers
- MIT License

---

## [v1.0.0] - 2024-07-23

### Added - Core Features

#### Backend Infrastructure
- Node.js + Express backend with REST API endpoints
- PostgreSQL database connection and pool management
- Docker Compose configuration for PostgreSQL service
- Environment configuration via .env file
- API endpoints for cameras, NPCs, users, sightings, and obstacles

#### Authentication & Users
- User login functionality with React AuthContext
- User creation and management endpoints
- Basic user CRUD operations via REST API

#### Camera System
- Camera creation, update, and deletion (CRUD operations)
- Camera ownership tracking - only owners can edit their cameras
- Configurable camera range (1-5 tile limit)
- User camera limit of 5 cameras maximum
- Camera position tracking on 20x20 map
- Camera sidebar with detailed information (ID, owner, position, range)

#### NPC Simulation
- NPCs move randomly across a 20x20 map
- Simulation runs on 2-second intervals
- NPC creation and management endpoints
- Real-time NPC position updates on frontend
- NPC movement respects obstacles and camera positions

#### Sighting System
- Automatic sighting detection when NPCs enter camera range
- Line-of-sight checking with obstacle blocking
- Sighting records include: camera, NPC, timestamp, position
- Sighting retrieval endpoints (all, by camera, by NPC)
- Total sighting count tracking per camera and NPC
- Trajectory sidebar showing NPC detection history

#### Obstacle System
- Obstacles table in database
- Three obstacle types: trees (green), cars (blue), buildings (grey)
- Obstacle loading on frontend
- NPCs cannot move into obstacle tiles
- Cameras cannot be placed on obstacle tiles
- Obstacles block camera line-of-sight
- Legend display for obstacle symbols

#### Frontend UI/UX
- React + Vite single-page application
- Login page with authentication
- Interactive 20x20 grid map visualization
- Click-to-place camera functionality
- Real-time NPC movement visualization
- Camera information sidebar with:
  - Camera ID, owner, position, range
  - Edit range functionality (owner only)
  - Delete camera button (owner only)
  - Sighting records display
- Trajectory sidebar with:
  - NPC selection dropdown
  - List of cameras that detected the NPC
  - Highlighted seen-by cameras on map
  - Total sighting count
- Legend table showing map symbols and meanings
- Logout functionality
- Visual feedback for errors (console logging)

#### Database Schema
- Users table (for authentication and ownership)
- Cameras table (position, range, owner reference)
- NPCs table (position, name)
- Sightings table (detection records with timestamps)
- Obstacles table (position, type)

#### Development Tools
- nodemon for development server auto-reload
- Postman for API testing and validation
- Docker + Docker Compose for containerized deployment

### Technical Details

#### Simulation
- Randomly moves NPCs one tile per tick (2-second interval)
- Checks all camera/NPC pairs for detection potential
- Performs line-of-sight checks considering obstacles
- Creates sighting records for new detections
- Prevents NPC movement into occupied tiles (obstacles, cameras)

#### API Structure
- Base path: /api
- Authentication: POST /api/auth/login
- Users: POST /api/users, GET /api/users
- Cameras: POST, GET, PUT, DELETE /api/cameras, /api/cameras/:id
- NPCs: POST, GET /api/npcs
- Sightings: GET /api/sightings, /api/sightings/cameras/:cameraId, /api/sightings/npcs/:npcId
- Obstacles: GET /api/obstacles

### Project Structure
```
├── backend/                    # Express.js application
│   ├── src/
│   │   ├── app.js             # Main app entry, route registration, simulation start
│   │   ├── routes/            # API route definitions
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic (including simulationService.js)
│   │   ├── repositories/      # Database access layer
│   │   └── config/            # Configuration (database connection, environment)
│   └── package.json           # Backend dependencies
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── pages/             # Login, Map pages
│   │   ├── components/        # UI components (sidebars, legend, etc.)
│   │   ├── context/           # React Context (AuthContext)
│   │   └── App.jsx            # Main app component
│   └── package.json           # Frontend dependencies
├── database/
│   └── init.sql               # Database schema initialization
├── docker-compose.yml         # PostgreSQL container configuration
├── .env.template              # Environment variables template
└── README.md                  # Project documentation
```

### Technologies Used
- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Development**: nodemon
- **API Testing**: Postman

### Known Limitations & Future Work
- Many routes are currently open (need authentication middleware protection)
- Request validation and error handling could be improved
- Frontend features for creating obstacles and replaying sightings not yet implemented
- Comprehensive test suite for services and controllers needed
- Seed data and migration tooling would improve reproducibility

---

## Release Notes

### Getting Started
See [README.md](README.md) for:
- Prerequisites and environment setup
- Installation instructions for manual development setup
- Docker Compose quick start guide
- API endpoint documentation
- Example curl requests

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
