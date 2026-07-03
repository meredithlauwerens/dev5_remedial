-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CAMERAS
CREATE TABLE cameras (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    range INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_camera_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- NPCS
CREATE TABLE npcs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    current_x INTEGER NOT NULL,
    current_y INTEGER NOT NULL
);

-- SIGHTINGS
CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    camera_id INTEGER NOT NULL,
    npc_id INTEGER NOT NULL,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_camera
        FOREIGN KEY (camera_id)
        REFERENCES cameras(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_npc
        FOREIGN KEY (npc_id)
        REFERENCES npcs(id)
        ON DELETE CASCADE
);