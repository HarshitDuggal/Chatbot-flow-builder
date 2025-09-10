import "./SidePanel.styles.css";
import { LuMessageCircleMore } from "react-icons/lu";

function Sidepanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="side-bar-container">
      <div
        className="node-container"
        onDragStart={(event) => onDragStart(event, "message")}
        draggable
      >
        <LuMessageCircleMore style={{ alignItems: "center" }} />
        <p>Message</p>
      </div>
    </div>
  );
}

export default Sidepanel;