import type { Dispatch, SetStateAction } from "react";
import { type Edge, type Node as FlowNode } from "@xyflow/react";
import "./Header.styles.css";
import { saveToStorage } from "../../utility/localStorage";
import { toast } from "react-hot-toast";
import type { MessageNodeData } from "../../pages/Home";

const Header = ({
  nodes,
  setNodes,
  edges,
  selectedNodeId,
  draftLabel,
  setDraftLabel,
  setIsEditing,
}: {
  nodes: FlowNode[];
  setNodes: Dispatch<SetStateAction<MessageNodeData[]>>;
  edges: Edge[];
  selectedNodeId?: string;
  draftLabel: string;
  setDraftLabel: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const saveChanges = () => {
    // if (!selectedNodeId) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: draftLabel } }
          : node
      )
    );
    setIsEditing(false);
    setDraftLabel("");
    console.log("Node Saved:", draftLabel);
    saveToStorage("nodeData", nodes);
    saveToStorage("edgeData", edges);
    toast.success("Changes saved successfully!");
  };
  return (
    <div className="header-continer">
      <h3>Chatbot flow builder</h3>
      <button className="save-changes-btn" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default Header;
