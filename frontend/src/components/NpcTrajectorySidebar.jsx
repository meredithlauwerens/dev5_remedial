import { useEffect, useState } from "react";
import { getNpcTrajectory } from "../services/api";
import PropTypes from "prop-types";

export default function NpcTrajectorySidebar({ selectedNpc, npcs, setSelectedNpc, npcTrajectory, setNpcTrajectory }) {
	useEffect(() => {
		console.log("Selected NPC:", selectedNpc);
		async function loadTrajectory() {
			if (!selectedNpc) {
				setNpcTrajectory([]);
				return;
			}

			try {
				const data = await getNpcTrajectory(selectedNpc.id);
				console.log(data);
				setNpcTrajectory(data);
			} catch (error) {
				console.error(error);
			}
		}

		loadTrajectory();
	}, [selectedNpc]);

	return (
		<div
			style={{
				width: "280px",
				borderLeft: "1px solid lightgray",
				padding: "10px",
				marginTop: "-70px",
			}}
		>
			<h2>NPC Trajectory</h2>

			<label>
				<strong>Select NPC:</strong>
			</label>

			<select
				value={selectedNpc?.id || ""}
				onChange={(e) => {
					const npc = npcs.find((n) => n.id === Number(e.target.value));

					setSelectedNpc(npc || null);
				}}
				style={{
					width: "100%",
					marginTop: "8px",
					marginBottom: "20px",
				}}
			>
				<option value="">Select NPC</option>

				{npcs.map((npc) => (
					<option key={npc.id} value={npc.id}>
						{npc.name}
					</option>
				))}
			</select>

			{!selectedNpc ? (
				<p>Select an NPC.</p>
			) : npcTrajectory.length === 0 ? (
				<p>No sightings yet.</p>
			) : (
				<>
					<h3>Trajectory - seen by</h3>

					<ul
						style={{
							maxHeight: "400px",
							overflowY: "auto",
							paddingLeft: "20px",
						}}
					>
						{npcTrajectory.map((step) => (
							<li key={step.id}>
								<strong>Camera {step.camera_id}</strong>
								<br />
								<small>{new Date(step.detected_at).toLocaleString()}</small>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

NpcTrajectorySidebar.propTypes = {
	npcs: PropTypes.array.isRequired,

	selectedNpc: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),

	setSelectedNpc: PropTypes.func.isRequired,

	npcTrajectory: PropTypes.array.isRequired,
	setNpcTrajectory: PropTypes.func.isRequired,
};
