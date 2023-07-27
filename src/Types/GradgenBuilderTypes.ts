import { arcArrType, circleArrType, rectArrType } from "./CanvasTypes";
import { Coord } from "./GlobalTypes";

export interface Tab {
  id: string;
  name: string;
  type: "linear" | "radial" | "conic";
  direction?: number;
  stops?: boolean;
  colors: string[];
  gradient?: string;
  center?: Coord;
  shapeArr?: arcArrType | circleArrType | rectArrType;
  selectedColor?: string;
}

export type tabArr = Array<Tab>;
