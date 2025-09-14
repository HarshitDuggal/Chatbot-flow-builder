import { type Edge, useEdgesState, useNodesState, type Node as FlowNode } from "@xyflow/react";
import CanvasScreen from "../../components/CanvasScreen.tsx/CanvasScreen";
import Sidepanel from "../../components/SidePanel/SidePanel";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import "./index.css";
import { getFromStorage } from "../../utility/loaclStorage";

export const Home = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftLabel, setDraftLabel] = useState<string>('');

useEffect(() => {
  const nodesFromStorage = getFromStorage<FlowNode[]>("nodeData", []);
  const edgesFromStorage = getFromStorage<Edge[]>("edgeData", []);

  if (nodesFromStorage.length > 0) {
    setNodes(nodesFromStorage);

    if (edgesFromStorage.length > 0) {
      setEdges(edgesFromStorage);
    }
  }
}, []);

  return (
    <div>
      <Header
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        selectedNodeId={selectedNodeId}
        draftLabel={draftLabel}
        setDraftLabel={setDraftLabel}
        setIsEditing={setIsEditing} />
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
            setIsEditing={setIsEditing} />
        </div>
        <div className="side-panel-container">
          <Sidepanel
            isEditing={isEditing}
            draftLabel={draftLabel}
            setDraftLabel={setDraftLabel} />
        </div>
      </div>
    </div>
  );
};
