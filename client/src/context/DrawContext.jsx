import { createContext, useContext, useState } from "react";

const DrawContext = createContext();

const DrawProvider = ({ children }) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#ffffff");
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <DrawContext.Provider value={{ tool, setTool, color, setColor, selectedIds, setSelectedIds }}>
      {children}
    </DrawContext.Provider>
  );
};


export { DrawProvider }
export const useDraw = () => useContext(DrawContext);