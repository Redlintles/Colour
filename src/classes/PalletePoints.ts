import { palleteType, ColorCoord } from "context/PalleteGenContext";
import { v4 as uuidV4 } from "uuid";
import DrawCanvas from "./DrawCanvas";

import { Coord } from "../Types/GlobalTypes";

interface PalletePoints {
  canvas: HTMLCanvasElement;
  center: Coord;
  canvasOBJ: DrawCanvas;
  mainPoint: Coord;
  saturation: boolean;
  palleteType: palleteType;
  colors: string[];
  findPointColor(coord: Coord): string;
  findColorPoint(hue: number, secondValue: number): Coord;
  parser(): Array<Coord>;
}

export interface PalletePointsSchema extends PalletePoints {}

class PalletePoints implements PalletePoints {
  static cartesianDistance(p1: Coord, p2: Coord) {
    return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  }
  static degToRad(deg: number) {
    return (Math.PI / 180) * deg;
  }

  static findPointColor(coord: Coord, ctx: CanvasRenderingContext2D): string {
    const color = ctx.getImageData(coord[0], coord[1], 1, 1).data.slice(0, 3);
    let hex = "#";
    for (let i of color) {
      let parsed = i.toString(16);
      if (parsed.length === 1) {
        parsed = parsed.padStart(2, "0");
      }
      hex += parsed;
    }

    return hex;
  }
  static findColorPoint(
    hue: number,
    secondValue: number,
    center: Coord
  ): Coord {
    const angle = 0.5 * Math.PI + PalletePoints.degToRad(hue);
    const dist = (secondValue / 100) * center[0];

    const x = center[0] - Math.cos(angle) * dist;
    const y = center[1] - Math.sin(angle) * dist;
    return [x, y];
  }
  constructor(
    canvasOBJ: DrawCanvas,
    mainPoint: Coord,
    palleteType: palleteType,
    saturation: boolean
  ) {
    this.canvasOBJ = canvasOBJ;
    this.canvasOBJ.drawOnlyWheel();
    this.canvas = canvasOBJ.canvas;
    this.center = [this.canvas.width / 2, this.canvas.height / 2];
    this.mainPoint = mainPoint;
    this.palleteType = palleteType;
    this.colors = this.points.map((point: Coord) =>
      PalletePoints.findPointColor(point, this.context)
    );
    this.saturation = saturation;
  }

  get points() {
    return this.parser();
  }

  get context(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  get canvasWidth(): number {
    return this.canvas.width;
  }
  get canvasHeight(): number {
    return this.canvas.height;
  }

  get secondaryColors(): ColorCoord[] {
    return this.points.map((item: Coord): ColorCoord => {
      return {
        id: uuidV4(),
        color: PalletePoints.findPointColor(item, this.context),
        coord: item,
      };
    });
  }

  get distance(): number {
    return PalletePoints.cartesianDistance(this.center, this.mainPoint);
  }
  get angle(): number {
    return Math.atan2(
      this.center[1] - this.mainPoint[1],
      this.center[0] - this.mainPoint[0]
    );
  }

  get analog(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    for (let i = -30; i <= 30; i += 15) {
      if (!i) {
        continue;
      }
      const sin = Math.sin(this.angle + PalletePoints.degToRad(i));
      const cos = Math.cos(this.angle + PalletePoints.degToRad(i));

      const x = this.center[0] - cos * this.distance;
      const y = this.center[0] - sin * this.distance;

      secondaryPoints.push([x, y]);
    }

    return secondaryPoints;
  }

  get monocramatic(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    for (let i = 1; i <= 4; i++) {
      const sin = Math.sin(this.angle);
      const cos = Math.cos(this.angle);
      const x = this.center[0] - ((cos * this.distance) / 5) * i;
      const y = this.center[1] - ((sin * this.distance) / 5) * i;
      secondaryPoints.push([x, y]);
    }
    return secondaryPoints;
  }

  get triple(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    const multipliers = [1, 2 / 3, 1, 2 / 3];
    for (let i = 0; i < multipliers.length; i++) {
      let invert = i > 1 ? -1 : 1;

      const sin =
        Math.sin(this.angle + PalletePoints.degToRad(60) * invert) * -1;
      const cos =
        Math.cos(this.angle + PalletePoints.degToRad(60) * invert) * -1;
      const x = this.center[0] - cos * this.distance * multipliers[i];
      const y = this.center[1] - sin * this.distance * multipliers[i];

      secondaryPoints.push([x, y]);
    }

    return secondaryPoints;
  }
  get square(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    const sin1 = Math.sin(this.angle) * -1;
    const cos1 = Math.cos(this.angle) * -1;

    const sin2 = Math.sin(this.angle + PalletePoints.degToRad(90)) * -1;
    const cos2 = Math.cos(this.angle + PalletePoints.degToRad(90)) * -1;

    const sin3 = Math.sin(this.angle - PalletePoints.degToRad(90)) * -1;
    const cos3 = Math.cos(this.angle - PalletePoints.degToRad(90)) * -1;

    const sin4 = Math.sin(this.angle) * -1;
    const cos4 = Math.cos(this.angle) * -1;

    const angleArr = [
      [cos1, sin1, 1],
      [cos2, sin2, 1],
      [cos3, sin3, 1],
      [cos4, sin4, 2 / 3],
    ];

    for (let [cos, sin, multiplier] of angleArr) {
      const x = this.center[0] - cos * this.distance * multiplier;
      const y = this.center[1] - sin * this.distance * multiplier;

      secondaryPoints.push([x, y]);
    }

    return secondaryPoints;
  }
  get composed(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    const sin1 = Math.sin(this.angle + PalletePoints.degToRad(15)) * -1;
    const cos1 = Math.cos(this.angle + PalletePoints.degToRad(15)) * -1;

    const x1 = this.center[0] - cos1 * this.distance;
    const y1 = this.center[1] - sin1 * this.distance;

    const sin2 = Math.sin(this.angle - PalletePoints.degToRad(15));
    const cos2 = Math.cos(this.angle - PalletePoints.degToRad(15));

    const x2 = this.center[0] - cos2 * this.distance;
    const y2 = this.center[1] - sin2 * this.distance;

    const sin3 = Math.sin(this.angle + PalletePoints.degToRad(45)) * -1;
    const cos3 = Math.cos(this.angle + PalletePoints.degToRad(45)) * -1;

    const x3 = this.center[0] - cos3 * this.distance;
    const y3 = this.center[1] - sin3 * this.distance;

    const sin4 = Math.sin(this.angle - PalletePoints.degToRad(45));
    const cos4 = Math.cos(this.angle - PalletePoints.degToRad(45));

    const x4 = this.center[0] - cos4 * this.distance;
    const y4 = this.center[1] - sin4 * this.distance;

    secondaryPoints.push([x1, y1], [x2, y2], [x3, y3], [x4, y4]);

    return secondaryPoints;
  }
  get complementar(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    for (let i = 1; i <= 4; i++) {
      const sin = Math.sin(this.angle) * -1;
      const cos = Math.cos(this.angle) * -1;
      const x = this.center[0] - ((cos * this.distance) / 5) * i;
      const y = this.center[1] - ((sin * this.distance) / 5) * i;
      secondaryPoints.push([x, y]);
    }
    return secondaryPoints;
  }
  get slashComplementar(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    for (let i = 0; i < 4; i++) {
      const multiplier = i > 1 ? 2 / 3 : 1;
      const invert = i % 2 === 0 ? 1 : -1;

      const sin =
        Math.sin(this.angle + PalletePoints.degToRad(30) * invert) * -1;
      const cos =
        Math.cos(this.angle + PalletePoints.degToRad(30) * invert) * -1;

      const x = this.center[0] - cos * this.distance * multiplier;
      const y = this.center[0] - sin * this.distance * multiplier;
      secondaryPoints.push([x, y]);
    }

    return secondaryPoints;
  }
  get doubleSlashComplementar(): Coord[] {
    const secondaryPoints: Array<Coord> = [];

    for (let i = 0; i < 4; i++) {
      let invert = i > 1 ? 1 : -1;
      let angle = i % 2 === 0 ? 180 : 0;

      const sin1 =
        Math.sin(this.angle + PalletePoints.degToRad(30 + angle) * invert) * -1;
      const cos1 =
        Math.cos(this.angle + PalletePoints.degToRad(30 + angle) * invert) * -1;
      const x1 = this.center[0] - cos1 * this.distance;
      const y1 = this.center[1] - sin1 * this.distance;
      secondaryPoints.push([x1, y1]);
    }

    return secondaryPoints;
  }

  parser(): Coord[] {
    switch (this.palleteType) {
      case "analog":
        return this.analog;
      case "monocromatic":
        return this.monocramatic;
      case "triple":
        return this.triple;
      case "square":
        return this.square;
      case "composed":
        return this.composed;
      case "complementar":
        return this.complementar;
      case "slash-complementar":
        return this.slashComplementar;
      case "double-slash-complementar":
        return this.doubleSlashComplementar;
    }
  }

  changeMainPoint(newValue: Coord) {
    const [x, y] = newValue;
    if (x >= 0 && x <= this.canvasWidth && y >= 0 && y <= this.canvasHeight) {
      this.mainPoint = newValue;
    }
  }
}

export default PalletePoints;
