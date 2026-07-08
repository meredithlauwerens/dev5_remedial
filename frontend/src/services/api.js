const API_URL = "http://localhost:3000/api";

export async function login(username) {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",

		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			username,
		}),
	});

	return response.json();
}

export async function getCameras() {
	const response = await fetch("http://localhost:3000/api/cameras");

	if (!response.ok) {
		throw new Error("Failed to load cameras");
	}

	return response.json();
}

export async function createCamera(camera) {
	const response = await fetch(`${API_URL}/cameras`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(camera),
	});

	if (!response.ok) {
		throw new Error("Failed to create camera");
	}

	return response.json();
}

export async function updateCamera(id, range) {
	const response = await fetch(`${API_URL}/cameras/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ range }),
	});

	if (!response.ok) {
		throw new Error("Failed to update camera");
	}

	return response.json();
}

export async function deleteCamera(id) {
	const response = await fetch(`${API_URL}/cameras/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete camera");
	}
}

export async function getNpcs() {
	const response = await fetch(`${API_URL}/npcs`);

	if (!response.ok) {
		throw new Error("Failed to fetch NPCs");
	}

	return response.json();
}

export async function getCameraSightings(cameraId) {
	const response = await fetch(`${API_URL}/sightings/cameras/${cameraId}`);

	if (!response.ok) {
		throw new Error("Failed to fetch sightings");
	}

	return response.json();
}

export async function getNpcSightings(npcId) {
	const response = await fetch(`${API_URL}/sightings/npcs/${npcId}`);

	if (!response.ok) {
		throw new Error("Failed to fetch NPC sightings");
	}

	return response.json();
}

export async function getNpcTrajectory(npcId) {
	const response = await fetch(`${API_URL}/sightings/npcs/${npcId}`);

	if (!response.ok) {
		throw new Error("Failed to fetch trajectory");
	}

	return response.json();
}