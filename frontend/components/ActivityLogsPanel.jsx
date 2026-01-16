import React from "react";

export default function ActivityLogsPanel({ logs }) {
  const hasLogs = logs?.length > 0;

  return (
    <div className="panel logs-panel">
      <div className="panel-title">Activity</div>

      {!hasLogs ? (
        <div className="empty-state">No activity yet.</div>
      ) : (
        <div className="logs-stack">
          {logs.map((log) => (
            <article className="log-card" key={log.id}>
              <div className="log-card__meta">
                {new Date(log.time).toLocaleTimeString()} • {log.user}
              </div>
              <div className="log-card__message">
                <span className="log-card__type">{log.type}</span>
                <span className="log-card__text">{log.message}</span>
              </div>
              <div className="log-card__file">{log.file}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
