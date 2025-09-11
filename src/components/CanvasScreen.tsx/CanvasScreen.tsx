import {
  Background,
  Controls,
  ReactFlow,
  type Node as FlowNode,
  type Edge,
  addEdge,
  type Connection,
  type NodeProps,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import MessageNode from "../CustomNode/CustomNode";


const CanvasScreen = () => {
  // Annotate nodes and edges with proper types
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
const nodeTypes = {
  messageNode: MessageNode
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

    const newNode: FlowNode = {
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
  (params:Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  [],
);



  return (
    <div style={{ height: "100%", width: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => setSelectedNodeId(node.id)}
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