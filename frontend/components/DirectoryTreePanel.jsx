import React from "react";
import DirectoryIcon from "./Assets";

function TreeNode({ node, level, activeFilePath, onSelectFile }) {
  const paddingLeft = 12 + level * 14;
  const isFolder = node.type === "folder";
  const isActive = node.path === activeFilePath;

  if (isFolder) {
    return (
      <div className="tree-node tree-node--folder" style={{ paddingLeft }}>
        <div className="tree-node__label">
          <DirectoryIcon />
          <span>{node.name}</span>
        </div>

        <div className="tree-children">
          {node.children?.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              activeFilePath={activeFilePath}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={`tree-node tree-node--file${isActive ? " is-active" : ""}`}
      style={{ paddingLeft }}
      onClick={() => onSelectFile(node)}
      onKeyDown={(evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          onSelectFile(node);
        }
      }}
    >
      <span className="tree-node__glyph" aria-hidden>
        📄
      </span>
      <span className="tree-node__text">{node.name}</span>
    </div>
  );
}

export default function DirectoryTreePanel({ tree, activeFilePath, onSelectFile }) {
  return (
    <div className="panel tree-panel">
      <div className="panel-title">Project</div>
      <div className="tree-scroll">
        {tree.map((node) => (
          <TreeNode
            key={node.path}
            node={node}
            level={0}
            activeFilePath={activeFilePath}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </div>
  );
}
