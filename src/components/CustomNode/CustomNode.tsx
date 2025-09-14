import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessage3Line } from "react-icons/ri";

type MessageNodeData = Node<{ label: string }, "string">;
const MessageNode = ({ data, selected }: NodeProps<MessageNodeData>) => {
  return (
    <div
      style={{
        cursor: "pointer",
        padding: 8,
        border: selected ? "2px solid #007aff" : "1px solid #666",
        borderRadius: 4,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#B3EFE6",
          padding: "4px",
          borderRadius: "4px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RiMessage3Line />
        <h4>Send Message</h4>
        <div style={{ marginLeft: "100px" }}>
          <FaWhatsapp />
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <span>{data.label}</span>
    </div>
  );
};

export default MessageNode;
