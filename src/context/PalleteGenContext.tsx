import { createContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { DrawCanvasSchema } from "../classes/DrawCanvas";

import { Coord } from "../Types/GlobalTypes";

export type palleteType =
  | "analog"
  | "monocromatic"
  | "triple"
  | "square"
  | "composed"
  | "complementar"
  | "slash-complementar"
  | "double-slash-complementar";

export interface ColorCoord {
  id: string;
  coord: Coord;
  color: string;
}

export interface PalleteGen {
  mainColor: ColorCoord;
  secondaryColors: Array<ColorCoord>;
  type: palleteType;
  canvasOBJ?: DrawCanvasSchema;
  saturationGrad: boolean;
}

const defaultValue: PalleteGen = {
  mainColor: { color: "#ff0000", coord: [150, 0], id: uuidV4() },
  secondaryColors: [{ color: "#ff0000", coord: [150, 0], id: uuidV4() }],
  type: "analog",
  saturationGrad: true,
};

interface PalleteGenContext {
  pallete: PalleteGen;
  setPallete: Function;
}

export const palleteGenContext = createContext<PalleteGenContext>({
  pallete: defaultValue,
  setPallete: () => {},
});

export function PalleteGenContextProvider({ children }: any) {
  const [pallete, setPallete] = useState<PalleteGen>(defaultValue);

  return (
    <palleteGenContext.Provider value={{ pallete, setPallete }}>
      {children}
    </palleteGenContext.Provider>
  );
}
