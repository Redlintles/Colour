import PalletePoints from "classes/PalletePoints";
import { ColorCoord, palleteType } from "./PalleteGenContext";
import { createContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export interface ColorBarContextSchema {
  mainColor: ColorCoord;
  secondaryColors: ColorCoord[];
  palleteType: palleteType;
  modifiedBy: "canvas" | "color" | "default" | "recalc" | "storage";
}

const defaultValue: ColorBarContextSchema = {
  mainColor: {
    color: "#ff0000",
    coord: [150, 0],
    id: uuidV4(),
  },
  secondaryColors: [],
  palleteType: "analog",
  modifiedBy: "default",
};

interface ContextSchema {
  colorBarData: ColorBarContextSchema;
  setColorBarData: React.Dispatch<React.SetStateAction<ColorBarContextSchema>>;
}

export const ColorBarContext = createContext<ContextSchema>({
  colorBarData: defaultValue,
  setColorBarData: () => {},
});

export function ColorBarContextProvider({ children }: any) {
  const [colorBarData, setColorBarData] =
    useState<ColorBarContextSchema>(defaultValue);
  return (
    <>
      <ColorBarContext.Provider value={{ colorBarData, setColorBarData }}>
        {children}
      </ColorBarContext.Provider>
    </>
  );
}
