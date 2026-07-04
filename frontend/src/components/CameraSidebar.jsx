export default function CameraSidebar({ camera, currentUser }) {
	if (!camera) {
		return (
			<div
				style={{
					width: "280px",
					borderLeft: "1px solid lightgray",
					padding: "20px",
				}}
			>
				<h2>Camera Information</h2>

				<p>Select a camera.</p>
			</div>
		);
	}

	const isOwner = camera.user_id === currentUser.id;

	return (
		<div
			style={{
				width: "280px",
				borderLeft: "1px solid lightgray",
				padding: "20px",
			}}
		>
			<h2>Camera Information</h2>
            
			<p>
				<strong>📷 Camera #{camera.id}</strong>
			</p>

			<p>
				<strong>Owner:</strong> {camera.username}
			</p>

			<p>
				<strong>Position:</strong> ({camera.x}, {camera.y})
			</p>

			<p>
				<strong>Range:</strong> {camera.range}
			</p>

			{isOwner && (
				<>
					<button>Edit</button>

					<button>Delete</button>
				</>
			)}
		</div>
	);
}
