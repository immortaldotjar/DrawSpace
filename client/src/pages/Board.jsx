import { useEffect, useState } from "react";
import Toolbar from "../components/ToolBar";
import Canvas from "../components/CanvasComps/Canvas";
import { DrawProvider } from "../context/DrawContext";

const Board = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("drawspace_elements");
    if (saved) setElements(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("drawspace_elements", JSON.stringify(elements));
    }, 300);
    return () => clearTimeout(timeout);
  }, [elements]);

  const handleClear = () => setElements([]);

  return (
    <DrawProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <Toolbar onClear={handleClear} />
        <Canvas elements={elements} setElements={setElements} />
      </div>
    </DrawProvider>
  );
};

export default Board