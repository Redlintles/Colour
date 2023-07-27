export interface Rect {
  color: string;
  start: number;
  width: number;
  percent: number;
}

export interface Circle {
  color: string;
  radius: number;
  percent: number;
}

export interface Arc {
  color: string;
  startAngle: number;
  endAngle: number;
  percent: number;
}

export type arcArrType = Array<Arc>;
export type rectArrType = Array<Rect>;
export type circleArrType = Array<Circle>;
