import Map from "../components/Map";
import { useAuth } from "../context/AuthContext";

export default function MapPage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>Neighborhood Surveillance Map</h1>

			{user && <h2>Welcome {user.username}</h2>}

			<Map />
		</div>
	);
}
