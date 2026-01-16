import React, { useMemo, useState } from "react";

export default function ChatWindow({ title = "Team Chat", messages = [], onSend }) {
	const [draft, setDraft] = useState("");

	const sortedMessages = useMemo(() => {
		return [...messages].sort((a, b) => new Date(a.time) - new Date(b.time));
	}, [messages]);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const trimmed = draft.trim();
		if (!trimmed) return;
		onSend?.(trimmed);
		setDraft("");
	};

	return (
		<div className="panel chat-panel">
			<div className="panel-title">{title}</div>

			<div className="chat-window">
				{sortedMessages.length === 0 ? (
					<div className="empty-state">No messages yet.</div>
				) : (
					<div className="chat-list">
						{sortedMessages.map((msg) => (
							<div key={msg.id} className="chat-row">
								<div className="chat-meta">
									<span className="chat-author">{msg.author}</span>
									<span className="chat-time">
										{new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
									</span>
								</div>
								<div className="chat-text">{msg.text}</div>
							</div>
						))}
					</div>
				)}
			</div>

			<form className="chat-input" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Write a message"
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
}
