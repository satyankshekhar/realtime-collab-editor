import React, { useMemo, useState } from "react";
import DirectoryTreePanel from "../components/DirectoryTreePanel";
import EditorPanel from "../components/EditorPanel";
import ActivityLogsPanel from "../components/ActivityLogsPanel";
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

  return (
    <div className="workspace-shell">
      <div className="workspace-grid">
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

        <aside className="workspace-column workspace-column--log">
          <ActivityLogsPanel logs={logs} />
        </aside>
      </div>
    </div>
  );
}
