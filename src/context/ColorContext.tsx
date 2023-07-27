import React, { createContext, useState } from "react";

interface Color {
  color: string;
  modifiedBy: "alpha" | "click" | "input" | "default";
}

interface ColorContext {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>> | (() => {});
}

export const ColorContext = createContext<ColorContext>({
  color: { color: "hsl(30deg,50%,100%)", modifiedBy: "default" },
  setColor: () => {},
});

export function ColorContextProvider({ children }: any) {
  const [color, setColor] = useState<Color>({
    color: "hsla(30deg,50%,100%,50%)",
    modifiedBy: "default",
  });

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}
