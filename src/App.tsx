import "./App.css";
import "@xyflow/react/dist/style.css";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
