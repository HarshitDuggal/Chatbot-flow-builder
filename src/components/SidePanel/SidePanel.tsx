import type { Dispatch, SetStateAction } from "react";
import "./SidePanel.styles.css";
import { LuMessageCircleMore } from "react-icons/lu";

function Sidepanel({
  isEditing,
  draftLabel,
  setDraftLabel
}: {
  isEditing: boolean,
  draftLabel: string,
  setDraftLabel: Dispatch<SetStateAction<string>>
}) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="side-bar-container">
      {!isEditing ? (
        <div
          className="node-container"
          onDragStart={(event) => onDragStart(event, "message")}
          draggable
        >
          <LuMessageCircleMore style={{ alignItems: "center" }} />
          <p>Message</p>
        </div>) : (
        <div>
          <input
            type="text"
            placeholder="Edit Value"
            value={draftLabel}
            onChange={(e) => setDraftLabel(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default Sidepanel;