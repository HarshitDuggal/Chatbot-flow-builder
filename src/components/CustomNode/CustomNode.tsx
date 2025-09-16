import { type NodeProps, Handle, Position } from "@xyflow/react";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessage3Line } from "react-icons/ri";
import type { MessageNodeData } from "../../pages/Home/index";

const MessageNode = ({ data, selected }: NodeProps<MessageNodeData>) => {
  //Made Cutom node ui for design purpose
  return (
    <div
      style={{
        cursor: "pointer",
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
          alignItems: "center",
          fontSize: "small",
          fontFamily: "monospace"
        }}
      >
        <RiMessage3Line style={{marginRight:"7px"}}/>
        <span style={{fontFamily:"monospace",fontSize:"x-small"}}>Send Message</span>
        <div style={{ marginLeft: "100px" }}>
          <FaWhatsapp />
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <span style={{fontFamily:"monospace",fontSize:"x-small",margin:"5px"}}>{data.label}</span>
    </div>
  );
};

export default MessageNode;
