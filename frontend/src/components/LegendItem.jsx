export default function LegendItem({
	color,
	text,
	type = "circle",
}) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "8px",
			}}
		>
			<div
				style={{
					width: "18px",
					height: "18px",

					borderRadius:
						type === "circle" ? "50%" : "0",

					backgroundColor:
						type === "selected"
							? "white"
							: color,

					border:
						type === "selected"
							? "2px solid gold"
							: "1px solid lightgray",

					boxSizing: "border-box",
				}}
			/>

			<span>{text}</span>
		</div>
	);
}