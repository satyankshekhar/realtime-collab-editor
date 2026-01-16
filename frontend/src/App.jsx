import React, { useMemo, useState } from "react";
import DirectoryTreePanel from "../components/DirectoryTreePanel";
import EditorPanel from "../components/EditorPanel";
import ActivityLogsPanel from "../components/ActivityLogsPanel";
import ChatWindow from "../components/ChatWindow";
import ActiveContributers from "../components/ActiveContributers";
import "./App.css";

export default function Workspace() {
  const mockTree = useMemo(
    () => [
      {
        type: "folder",
        name: "src",
        path: "/src",
        children: [
          {
            type: "file",
            name: "App.jsx",
            path: "/src/App.jsx",
            language: "javascript",
          },
          {
            type: "file",
            name: "main.jsx",
            path: "/src/main.jsx",
            language: "javascript",
          },
        ],
      },
      { type: "file", name: "package.json", path: "/package.json", language: "json" },
    ],
    []
  );

  const initialFile = mockTree[0]?.children?.[0] ?? null;
  const [activeFile, setActiveFile] = useState(initialFile);
  const [fileContents, setFileContents] = useState({
    "/src/App.jsx": `export default function App(){ return <h1>Hello</h1> }`,
    "/src/main.jsx": `console.log("main");`,
    "/package.json": `{ "name": "code-editor" }`,
  });

  const [logs, setLogs] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { id: "m1", author: "Ava", text: "Welcome to the collab space!", time: Date.now() - 1000 * 60 * 2 },
    { id: "m2", author: "Noah", text: "I will refactor the tree view.", time: Date.now() - 1000 * 60 },
  ]);

  const contributors = useMemo(
    () => [
      { id: "c1", name: "Ava Harper", icon: "🦊", hue: 200 },
      { id: "c2", name: "Noah Singh", icon: "🐉", hue: 140 },
      { id: "c3", name: "Mia Chen", icon: "🐝", hue: 45 },
      { id: "c4", name: "Liam Patel", icon: "🐙", hue: 270 },
    ],
    []
  );

  const [sideTab, setSideTab] = useState("chat");

  const handleSelectFile = (file) => {
    setActiveFile(file);
    setLogs((prev) => [
      {
        id: crypto.randomUUID(),
        user: "You",
        type: "file-open",
        file: file.path,
        message: `Opened ${file.name}`,
        time: Date.now(),
      },
      ...prev,
    ]);
  };

  const handleCodeChange = (newCode) => {
    if (!activeFile) return;

    setFileContents((prev) => ({ ...prev, [activeFile.path]: newCode }));

    setLogs((prev) => [
      {
        id: crypto.randomUUID(),
        user: "You",
        type: "edit",
        file: activeFile.path,
        message: `Edited ${activeFile.name}`,
        time: Date.now(),
      },
      ...prev,
    ]);
  };

  const handleSendChat = (text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      author: "You",
      text,
      time: Date.now(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="workspace-shell">
      <ActiveContributers users={contributors} variant="strip" />

      <div className="workspace-grid workspace-grid--main">
        <aside className="workspace-column workspace-column--nav">
          <DirectoryTreePanel
            tree={mockTree}
            activeFilePath={activeFile?.path}
            onSelectFile={handleSelectFile}
          />
        </aside>

        <section className="workspace-column workspace-column--main">
          <EditorPanel
            activeFile={activeFile}
            code={fileContents[activeFile?.path] ?? ""}
            onChange={handleCodeChange}
          />
        </section>

        <aside className="workspace-column workspace-column--side">
          <div className="side-tabs">
            <button
              type="button"
              className={`side-tab ${sideTab === "chat" ? "is-active" : ""}`}
              onClick={() => setSideTab("chat")}
            >
              Messages
            </button>
            <button
              type="button"
              className={`side-tab ${sideTab === "logs" ? "is-active" : ""}`}
              onClick={() => setSideTab("logs")}
            >
              Logs
            </button>
          </div>

          <div className="side-panel">
            {sideTab === "chat" ? (
              <ChatWindow messages={chatMessages} onSend={handleSendChat} />
            ) : (
              <ActivityLogsPanel logs={logs} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
