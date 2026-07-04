import { useAuth } from "../context/AuthContext";

export default function MapPage() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Neighborhood Surveillance Map</h1>

            <p>
                {user && (
                    <h2>Welcome {user.username}</h2>
                )}
            </p>
        </div>
    );
}