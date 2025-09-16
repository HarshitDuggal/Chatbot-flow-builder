import {
  type Edge,
  useEdgesState,
  useNodesState,
  type Node as FlowNode,
} from "@xyflow/react";
import CanvasScreen from "../../components/CanvasScreen";
import Sidepanel from "../../components/SidePanel";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import "./index.css";
import { getFromStorage } from "../../utility/localStorage";

export type MessageNodeData = FlowNode<{ label: string }, "messageNode">;
// Define MessageNodeData type here for consistency across files

export const Home = () => {
  // Used the custom type of MessageNodeData in state hooks
  // Added in Home as single children component was there and small project so redux state management was not required
  const [nodes, setNodes, onNodesChange] = useNodesState<MessageNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // draft label is for showing in input box while editing
  // prevValue is for storing the previous value of node before editing so we can set to that if editing is cancelled
  const [draftLabel, setDraftLabel] = useState<string>("");
  const [prevValue, setPrevValue] = useState<string>("");
  

useEffect(() => {
  // Load nodes and edges from localStorage on component mount
  const nodesFromStorage = getFromStorage<MessageNodeData[]>("nodeData", []);
  const edgesFromStorage = getFromStorage<Edge[]>("edgeData", []);

  if (nodesFromStorage.length) setNodes(nodesFromStorage);
  if (edgesFromStorage.length) setEdges(edgesFromStorage);
}, []);
 
// Header component have button for saving to local storage & 
// setting the nodes change permanently other wise on Click of background it will be back to previous state
// if selected another node while editing it will discard the changes
// Side panel have input box for editing the label of node & drag and drop the nodes accoding to node type currently only one type
// CanvasScreen is the main canvas area where nodes are placed and connected 

  return (
    <div>
      <Header
        setNodes={setNodes}
        edges={edges}
        selectedNodeId={selectedNodeId}
        draftLabel={draftLabel}
        setDraftLabel={setDraftLabel}
        setIsEditing={setIsEditing}
      />
      <div className="main-container">
        <div className="flow-canvas-container">
          <CanvasScreen
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            setSelectedNodeId={setSelectedNodeId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedNodeId={selectedNodeId}
            prevValue={prevValue}
            setPrevValue={setPrevValue}
            setDraftLabel={setDraftLabel}
          />
        </div>
        <div className="side-panel-container">
          <Sidepanel
            isEditing={isEditing}
            draftLabel={draftLabel}
            setDraftLabel={setDraftLabel}
            setNodes={setNodes}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </div>
    </div>
  );
};
