import React from "react";
import Editor from "@monaco-editor/react";

export default function EditorPanel({ activeFile, code, onChange }) {
  const language = activeFile?.language ?? "javascript";

  return (
    <div className="panel editor-panel">
      <div className="editor-panel__bar">
        <div className="editor-panel__file">
          {activeFile ? activeFile.path : "No file selected"}
        </div>
        <div className="editor-panel__badge">{language}</div>
      </div>

      <div className="editor-panel__body">
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(val) => onChange(val ?? "")}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}
