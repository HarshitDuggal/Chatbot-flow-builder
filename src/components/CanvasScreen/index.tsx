import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  addEdge,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";
import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";
import type { MessageNodeData } from "../../pages/Home";
import MessageNode from "../CustomNode/CustomNode";

const CanvasScreen = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  onNodesChange,
  onEdgesChange,
  setSelectedNodeId,
  selectedNodeId,
  isEditing,
  setIsEditing,
  setPrevValue,
  prevValue,
  setDraftLabel,
}: {
  nodes: MessageNodeData[];
  setNodes: Dispatch<SetStateAction<MessageNodeData[]>>;
  onNodesChange: OnNodesChange<MessageNodeData>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
  selectedNodeId?: string;
  setSelectedNodeId: Dispatch<SetStateAction<string | undefined>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setPrevValue: Dispatch<SetStateAction<string>>;
  prevValue: string;
  setDraftLabel: Dispatch<SetStateAction<string>>;
}) => {
  // Annotate nodes and edges with proper types
  const nodeTypes = {
    messageNode: MessageNode,
  };
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    // Use non-null assertion or optional chaining to avoid null error
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return; // Guard if null

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode: MessageNodeData = {
      id: `node_${+new Date()}`,
      type: "messageNode",
      position,
      data: { label: "New Message" },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  // Properly type the event for onDragOver
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => {
        const updatedEdges = addEdge(params, edgesSnapshot);
        return updatedEdges;
      }),
    []
  );

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      console.log("here", "source" in connection && "target" in connection);

      if ("source" in connection && "target" in connection) {
        const alreadyConnected = edges.some(
          (e) =>
            e.source === connection.source || e.target === connection.target
        );

        if (alreadyConnected) {
          return false;
        }
      }
      return true;
    },
    [edges]
  );

  return (
    <div style={{ height: "100%", width: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          setIsEditing(true);
          setSelectedNodeId(node.id);
          setPrevValue(node.data.label);
        }}
        onPaneClick={() => {
          if (isEditing && selectedNodeId)
            setNodes((nds) =>
              nds.map((node) =>
                node.id === selectedNodeId
                  ? { ...node, data: { ...node.data, label: prevValue } }
                  : node
              )
            );
          setIsEditing(false);
          setSelectedNodeId(undefined);
          setDraftLabel("");
        }}
        isValidConnection={isValidConnection}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
        fitView
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CanvasScreen;
