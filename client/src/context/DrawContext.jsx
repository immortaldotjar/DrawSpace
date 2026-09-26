import { createContext, useContext, useState } from "react";

const DrawContext = createContext();

const DrawProvider = ({ children }) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1c1c1c");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <DrawContext.Provider value={{ tool, setTool, color, setColor, selectedId, setSelectedId }}>
      {children}
    </DrawContext.Provider>
  );
};


export { DrawProvider }
export const useDraw = () => useContext(DrawContext);