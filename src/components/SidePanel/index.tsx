import { type Dispatch, type SetStateAction } from "react";
import "./SidePanel.styles.css";
import { LuMessageCircleMore } from "react-icons/lu";
import type { MessageNodeData } from "../../pages/home/index";

function Sidepanel({
  isEditing,
  draftLabel,
  setDraftLabel,
  selectedNodeId,
  setNodes,
}: {
  isEditing: boolean;
  draftLabel: string;
  setDraftLabel: Dispatch<SetStateAction<string>>;
  selectedNodeId?: string;
  setNodes: Dispatch<SetStateAction<MessageNodeData[]>>;
}) {

  //Draged node handler
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  //setting both the nodes and draft label so that input box will have the value
  // and also the node value will be changed on typing in input box
  // so that if user clicks on save changes it will be saved
  // if user clicks elsewhere which deselects the node it will be reverted to previous value
  const OnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: e.target.value } }
          : node
      )
    );
    setDraftLabel(e.target.value);
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
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Edit Value"
            value={draftLabel}
            onChange={(e) => OnValueChange(e)}
          />
        </div>
      )}
    </div>
  );
}

export default Sidepanel;
