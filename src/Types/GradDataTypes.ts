export interface GradData {
  type: "linear" | "radial" | "conic" | "";
  stops: boolean;
  selectedColor: string;
  direction?: number;
  center?: [number, number];
  gradient?: string;
}

export interface DataContext {
  data: GradData | null;
  setData: React.Dispatch<React.SetStateAction<GradData | null>> | (() => {});
}
