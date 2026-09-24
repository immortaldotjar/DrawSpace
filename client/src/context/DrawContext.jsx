import { createContext, useContext, useState } from "react";

const DrawContext = createContext();

export const DrawProvider = ({ children }) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1c1c1c");

  return (
    <DrawContext.Provider value={{ tool, setTool, color, setColor }}>
      {children}
    </DrawContext.Provider>
  );
};

export const useDraw = () => useContext(DrawContext);