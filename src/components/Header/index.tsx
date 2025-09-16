import type { Dispatch, SetStateAction } from "react";
import { type Edge } from "@xyflow/react";
import "./Header.styles.css";
import { saveToStorage } from "../../utility/localStorage";
import { toast } from "react-hot-toast";
import type { MessageNodeData } from "../../pages/Home";

const Header = ({
  setNodes,
  edges,
  selectedNodeId,
  draftLabel,
  setDraftLabel,
  setIsEditing,
}: {
  setNodes: Dispatch<SetStateAction<MessageNodeData[]>>;
  edges: Edge[];
  selectedNodeId?: string;
  draftLabel: string;
  setDraftLabel: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  // Save changes to local storage and update nodes state
  const saveChanges = () => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: draftLabel } }
          : node
      );
      //called to save to storage utility function
      saveToStorage("nodeData", updatedNodes);
      saveToStorage("edgeData", edges);
      return updatedNodes;
    });
    toast.success("Changes saved successfully!");
    // Reset editing states
    setIsEditing(false);
    // Empty the draft as edit is discarded
    setDraftLabel("");
  };
  return (
    <div className="header-container">
      <h3>Chatbot flow builder</h3>
      <button className="save-changes-btn" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default Header;
