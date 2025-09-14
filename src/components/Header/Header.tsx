import type { Dispatch, SetStateAction } from 'react';
import { type Edge, type Node as FlowNode } from '@xyflow/react';
import './Header.styles.css'
import { saveToStorage } from '../../utility/loaclStorage';
import { toast } from 'react-hot-toast';

const Header = ({
  nodes,
  setNodes,
  edges,
  selectedNodeId,
  draftLabel,
  setDraftLabel,
  setIsEditing
}: {
  nodes: FlowNode[];
  setNodes: Dispatch<SetStateAction<FlowNode[]>>;
  edges: Edge[];
  selectedNodeId?: string;
  draftLabel: string;
  setDraftLabel:Dispatch<SetStateAction<string>>
  setIsEditing:Dispatch<SetStateAction<boolean>>;
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
    setDraftLabel('');
    console.log("Node Saved:", draftLabel);
    saveToStorage("nodeData",nodes);
    saveToStorage("edgeData",edges);
    toast.success("Changes saved successfully!");

  };
  return (
    <div className="header-continer">
      <h3>Chatbot flow builder</h3>
      <button className="button" onClick={saveChanges}>Save Changes</button>
    </div>
  )
}

export default Header;