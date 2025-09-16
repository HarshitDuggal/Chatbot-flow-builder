import { useEffect, type Dispatch, type SetStateAction } from "react";
import "./SidePanel.styles.css";
import { LuMessageCircleMore } from "react-icons/lu";
import { type Node as FlowNode } from "@xyflow/react";
import type { MessageNodeData } from "../../pages/Home";

function Sidepanel({
  isEditing,
  draftLabel,
  setDraftLabel,
  selectedNodeId,
  setNodes,
}: {
  isEditing: boolean;
  draftLabel: string;
  setDraftLabel: Dispatch<SetStateAction<string>>;
  selectedNodeId?: string;
  setNodes: Dispatch<SetStateAction<MessageNodeData[]>>;
}) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const OnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: e.target.value } }
          : node
      )
    );
    setDraftLabel(e.target.value);
  };
  return (
    <div className="side-bar-container">
      {!isEditing ? (
        <div
          className="node-container"
          onDragStart={(event) => onDragStart(event, "message")}
          draggable
        >
          <LuMessageCircleMore style={{ alignItems: "center" }} />
          <p>Message</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Edit Value"
            value={draftLabel}
            onChange={(e) => OnValueChange(e)}
          />
        </div>
      )}
    </div>
  );
}

export default Sidepanel;
