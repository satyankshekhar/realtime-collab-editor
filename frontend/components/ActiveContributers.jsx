import React from "react";

export default function ActiveContributers({ users = [], variant = "panel" }) {
	const list = users.length
		? users
		: [
				{ id: "1", name: "Ava", icon: "🦊", hue: 200 },
				{ id: "2", name: "Liam", icon: "🐙", hue: 270 },
				{ id: "3", name: "Mia", icon: "🐝", hue: 45 },
				{ id: "4", name: "Noah", icon: "🐉", hue: 140 },
			];

	if (variant === "strip") {
		return (
			<div className="contributors-strip">
				<div className="contributors-strip__label">Active now</div>
				<div className="contributors-row">
					{list.map((user) => (
						<div
							key={user.id}
							className="contributor contributor--compact"
							style={{
								background: `linear-gradient(135deg, hsla(${user.hue ?? 210}, 75%, 55%, 0.15), hsla(${(user.hue ?? 210) + 30}, 75%, 55%, 0.35))`,
								borderColor: `hsla(${user.hue ?? 210}, 80%, 60%, 0.5)`,
							}}
							title={user.name}
							aria-label={user.name}
						>
							<span className="contributor__icon">{user.icon ?? "👤"}</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="panel contributors-panel">
			<div className="panel-title">Active Contributors</div>
			<div className="contributors-row">
				{list.map((user) => (
					<div
						key={user.id}
						className="contributor"
						style={{
							background: `linear-gradient(135deg, hsla(${user.hue ?? 210}, 75%, 55%, 0.15), hsla(${(user.hue ?? 210) + 30}, 75%, 55%, 0.35))`,
							borderColor: `hsla(${user.hue ?? 210}, 80%, 60%, 0.5)`,
						}}
					>
						<span className="contributor__icon" title={user.name} aria-label={user.name}>
							{user.icon ?? "👤"}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
