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
import type { MessageNodeData } from "../../pages/Home/index";
import MessageNode from "../CustomNode/customNode";

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
  // Annotating nodes and edges with proper types
  const nodeTypes = {
    messageNode: MessageNode,
  };

  // | null is there because useRef starts as null and only later points to the DOM element.
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    // Using non-null assertion or optional chaining to avoid null error
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return; // Guard for null

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    //setting drop position of node
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    // Creating new node of type MessageNodeData
    // also we can add more types of nodes by adding type property and handling in nodeTypes object
    // currently only one type is there so hardcoded
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

  // Handling connecting an edge connection between nodes
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
      // Ensuring that a node can have only one incoming or outgoing connection
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

const handleNodeClick = (node:  MessageNodeData) => {
  if (isEditing && selectedNodeId && selectedNodeId !== node.id) {
    // Reset the previous node back to its old value
    // when a node is selected and we click another node while editing it will discard the changes of previous node
    setDraftLabel("");
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId
          ? { ...n, data: { ...n.data, label: prevValue } }
          : n
      )
    );
  }
  setIsEditing(true);
  setSelectedNodeId(node.id);
  setPrevValue(node.data.label);
};

const handlePaneClick = () => {
  if (isEditing && selectedNodeId) {
    // Reset the node back to its old value
    // when we click on background while editing it will discard the changes
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: prevValue } }
          : node
      )
    );
  }
  setIsEditing(false);
  setSelectedNodeId(undefined);
  setDraftLabel("");
};


  return (
    <div style={{ height: "100%", width: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => handleNodeClick(node)}
        onPaneClick={handlePaneClick}
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
