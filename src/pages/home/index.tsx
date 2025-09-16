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

export const Home = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<MessageNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftLabel, setDraftLabel] = useState<string>("");
  const [prevValue, setPrevValue] = useState<string>("");
  useEffect(() => {
    const nodesFromStorage = getFromStorage<MessageNodeData[]>("nodeData", []);
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
