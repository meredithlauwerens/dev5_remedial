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