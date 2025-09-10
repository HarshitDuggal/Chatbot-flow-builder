import { Background, Controls, ReactFlow,type Node, type Edge, type OnEdgesChange, type OnNodesChange } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";

const CanvasScreen = () => {
  // Annotate nodes and edges with proper types
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Use non-null assertion or optional chaining to avoid null error
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;  // Guard if null

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `node_${+new Date()}`,
        type: 'default',
        position,
        data: { label: 'New Message' },
      };

      setNodes(nds => nds.concat(newNode));
    },
    [],
  );

  // Properly type the event for onDragOver
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Correctly type onNodesChange and onEdgesChange callbacks
  const onNodesChange: OnNodesChange = (changes) => setNodes((nds) => {
    const newNodes = [...nds];
    // Apply changes here or use react-flow utility functions as needed
    return newNodes;
  });

  const onEdgesChange: OnEdgesChange = (changes) => setEdges((eds) => {
    const newEdges = [...eds];
    // Apply changes here or use react-flow utility functions as needed
    return newEdges;
  });

  return (
    <div style={{ height: "100%", width: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CanvasScreen;
