import React, { useState } from "react";
import { useReactFlow, type NodeProps,type Node, Handle, Position } from "@xyflow/react";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessage3Line } from "react-icons/ri";

type MessageNodeData = Node<{ label:string }, 'string'>;
const MessageNode = ({ id, data, selected }: NodeProps<MessageNodeData>) => {
  const { setNodes } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState<string>(data.label); // directly typed

  const handleClick = () => setEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label } }
          : node
      )
    );
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        padding: 8,
        border: selected ? "2px solid #007aff" : "1px solid #666",
        borderRadius: 4,
        background: "#fff",
      }}
    >
        <div style={{display:"flex",backgroundColor:"#B3EFE6",padding:"4px",borderRadius:"4px",justifyContent:"space-between",alignItems:"center"}}>
            
            <RiMessage3Line />
            <h4>Send Message</h4>
            <div style={{marginLeft:"100px"}}>
            <FaWhatsapp />
            </div>
        </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      {editing ? (
        <input
          value={label}   // ✅ string only
          autoFocus
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: "90%" }}
        />
      ) : (
        <span>{label}</span>  // ✅ ReactNode since label is string
      )}
    </div>
  );
};

export default MessageNode;
