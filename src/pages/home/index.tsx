import CanvasScreen from "../../components/CanvasScreen.tsx/CanvasScreen";
import Header from "../../components/Header/Header";
import Sidepanel from "../../components/SidePanel/SidePanel";
import "./index.css";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="flow-canvas-container">
          <CanvasScreen />
        </div>
        <div className="side-panel-container">
          <Sidepanel />
        </div>
      </div>
    </div>
  );
};
