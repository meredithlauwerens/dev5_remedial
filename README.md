# dev5_remedial — NPC-camera surveillance simulation

A small full-stack demo that simulates NPCs moving on a 2D map and cameras detecting them when in range with clear line-of-sight. The project includes:

- A Node.js + Express backend that exposes REST endpoints and runs a background simulation which creates "sighting" records when NPCs are detected by cameras.
- A React + Vite frontend that visualises the map, NPCs, cameras and sighting information (simple SPA).
- PostgreSQL database schema and an init script to create tables and seed the database.
- Optional Docker Compose configuration to run PostgreSQL in a container and initialize the database.

This README documents how to run the project locally, how the API is structured and useful development notes.

## Features

- Background simulation that moves NPCs around a 20x20 map and logs sightings when NPCs enter camera range.
- Line-of-sight checks that consider obstacles and prevent detections if blocked.
- CRUD endpoints for cameras and endpoints to manage NPCs and users.
- Lightweight React frontend for login and map visualization.

## Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgreSQL
- Dev tools: nodemon
- Containers: Docker, Docker Compose (Postgres service provided)

## Repository layout (important files)

- backend/: Express app, controllers, services, repositories
  - src/app.js — app entry (registers routes and starts simulation)
  - src/routes/* — route definitions (users, cameras, npcs, sightings, auth, obstacles)
  - src/services/simulationService.js — moves NPCs and creates sightings
  - src/config/database.js — PostgreSQL connection pool
- frontend/: React app (Vite)
- database/init.sql — SQL for creating tables (users, cameras, npcs, sightings, obstacles)
- docker-compose.yml — starts a Postgres container and runs init.sql
- .env.template — example environment variables for DB and Postgres

## Prerequisites

- Node.js (18+ recommended)
- npm
- PostgreSQL (if not using Docker)
- Docker & Docker Compose (optional, recommended for easy DB setup)

## Environment variables

Copy `.env.template` to `.env` (or set environment variables directly). Important variables:

- POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB — used by the Docker Postgres container
- DB_HOST — hostname for the database (e.g. `localhost` or `postgres` when using docker-compose)
- DB_PORT — database port (default 5432)
- DB_USER, DB_PASSWORD, DB_NAME — credentials used by the backend to connect to Postgres

## Database initialization

- The `database/init.sql` file creates the required tables: users, cameras, npcs, sightings, obstacles.
- When using Docker Compose (see below), `init.sql` is mapped into `/docker-entrypoint-initdb.d/` and runs automatically on first container startup.
- If running Postgres manually, run `psql -f database/init.sql` against your target database.

## Running with Docker (quick start)

1. Copy `.env.template` to `.env` and adjust values if needed.
2. Start the Postgres container and initialize the DB:

   docker compose up -d

   This starts a Postgres container named `surveillance-postgres` and runs `database/init.sql` on first initialization.

3. Start the backend and frontend locally (see Manual run) or build docker images for them if desired.

## Manual run (development)

1. Backend

- Open a terminal in the `backend/` folder.
- Install dependencies:

  npm install

- Ensure environment variables are set (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME). If using local Postgres, point DB_HOST at `localhost` and ensure `database/init.sql` has been applied.

- Start the backend in dev mode:

  npm run dev

  The backend listens on PORT (default 3000). On startup it attempts a DB connection and then calls `startSimulation()` which runs the NPC movement loop.

2. Frontend

- Open a terminal in the `frontend/` folder.
- Install dependencies:

  npm install

- Start the Vite dev server:

  npm run dev

- The frontend typically runs on http://localhost:5173 (Vite default).

## API Endpoints (summary)

Base path: /api

- Authentication
  - POST /api/auth/login — login (credentials handling implemented in authController)

- Users
  - POST /api/users — create a user
  - GET  /api/users — list users

- Cameras
  - POST /api/cameras — create a camera (fields: user_id, x, y, range)
  - GET  /api/cameras — list cameras
  - PUT  /api/cameras/:id — update camera
  - DELETE /api/cameras/:id — delete camera

- NPCs
  - POST /api/npcs — create an npc (fields: name, current_x, current_y)
  - GET  /api/npcs — list npcs

- Sightings
  - GET /api/sightings — list all recorded sightings
  - GET /api/sightings/cameras/:cameraId — list sightings for a camera
  - GET /api/sightings/npcs/:npcId — list sightings for an npc

- Obstacles
  - GET /api/obstacles — list obstacles

Notes: The backend registers routes in `src/app.js`. Review controller implementations for required request bodies and additional validations.

## Example curl requests

- Create a camera

  curl -X POST http://localhost:3000/api/cameras -H "Content-Type: application/json" -d '{"user_id":1,"x":5,"y":5,"range":6}'

- Get sightings

  curl http://localhost:3000/api/sightings

## Behavior & simulation notes

- The simulation runs on a 2-second interval and randomly moves NPCs one tile per tick, constrained to a 20x20 map.
- The simulation checks each camera/NPC pair for distance and line-of-sight (obstacles block sight). When a new detection occurs, a sighting record is inserted.
- The simulation avoids moving NPCs into tiles occupied by obstacles or cameras.

## Development notes / next steps

- Add authentication middleware and protect routes (many routes are currently open).
- Add request validation and better error handling in controllers.
- Add seed data and/or migration tooling for more repeatable setups.
- Add frontend features for creating cameras, obstacles and replaying sightings.
- Add tests for services (simulation logic) and controllers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Technologies used

* Frontend: React + Vite
* Backend: Node.js + Express
* Backend testing: PostMan
* Database: PostgreSQL
* Containers: Docker + Docker Compose

## Application

Open terminal and insert:

* In backend folder: npm run dev
* In frontend folder: npm run dev

## References

* Readme Documentation: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes 
* Conventional Commit Messages: https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13 , https://www.conventionalcommits.org/en/v1.0.0/ 
* Creating New Branch in Git: https://www.geeksforgeeks.org/git/how-to-create-a-new-branch-in-git/
* How to Style in CSS: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content 
* React Documentation: https://react.dev/reference/react 
* Helptool Coding: https://chatgpt.com/share/6a54f313-c468-83eb-9368-bb9216d86266 