import { palleteType, ColorCoord } from "../context/PalleteGenContext";
import { v4 as uuidV4 } from "uuid";
import PalletePoints from "./PalletePoints";

import { Coord } from "../Types/GlobalTypes";

interface DrawCanvas {
  id: string;
  canvas: HTMLCanvasElement;
  center: Coord;
  drawWidth: number;
  circleRadius: number;
  mainPoint: Coord;
  palleteType: palleteType;
  setMainColor: React.Dispatch<React.SetStateAction<ColorCoord>>;
  setSecondaryColors: React.Dispatch<React.SetStateAction<ColorCoord[]>>;
  saturation: boolean;
  drawColorWheel(): void;
  drawOnlyWheel(): void;
  drawMainPoint(point: Coord): void;
  drawSecondaryPoints(points: Array<Coord>): void;
  clearCanvas(): void;
  drawBasedOnEvent(e: MouseEvent): void;
  addEvents(): void;
}

export interface DrawCanvasSchema extends DrawCanvas {}

class DrawCanvas implements DrawCanvas {
  private distance(p1: Coord, p2: Coord): number {
    const d = (p2[1] - p1[1]) ** 2 + (p2[0] - p1[0]) ** 2;
    return Math.sqrt(d);
  }
  constructor(
    canvas: HTMLCanvasElement,
    drawWidth: number,
    palleteType: palleteType,
    setMainColor: React.Dispatch<React.SetStateAction<ColorCoord>>,
    setSecondaryColors: React.Dispatch<React.SetStateAction<ColorCoord[]>>
  ) {
    this.id = uuidV4();
    this.canvas = canvas;
    this.center = [this.width / 2, this.height / 2];
    this.drawWidth = drawWidth;
    this.circleRadius = this.drawWidth * 1.5;
    this.palleteType = palleteType;
    this.setMainColor = setMainColor;
    this.setSecondaryColors = setSecondaryColors;
    this.saturation = true;
    this.drawColorWheel();
    this.addEvents();
    this.mainPoint = this.center;
  }

  get width(): number {
    return this.canvas.width;
  }
  get height(): number {
    return this.canvas.height;
  }

  get context(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  clearCanvas(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private saturationGradient(): CanvasGradient {
    const satGradient = this.context.createRadialGradient(
      ...this.center,
      0,
      ...this.center,
      this.center[0]
    );
    satGradient.addColorStop(1, "#80808000");
    satGradient.addColorStop(0, "#808080ff");

    return satGradient;
  }

  private lightnessGradient(): CanvasGradient {
    const lumGradient = this.context.createRadialGradient(
      ...this.center,
      0,
      ...this.center,
      this.center[0]
    );

    for (let i = 0; i <= 0.5; i += 0.5) {
      let fillColor = `rgba(255,255,255,${1 - i * 2})`;
      lumGradient.addColorStop(i, fillColor);
    }

    for (let i = 0; i <= 10; i++) {
      let offset = 0.5 + 0.05 * i;
      let fillColor = `rgba(0,0,0,${i / 10}`;
      lumGradient.addColorStop(offset, fillColor);
    }

    return lumGradient;
  }

  drawColorWheel(): void {
    this.clearCanvas();

    const colorGradient = this.context.createConicGradient(
      1.5 * Math.PI,
      ...this.center
    );

    colorGradient.addColorStop(1 / 7, "#ff0000");
    colorGradient.addColorStop((1 / 7) * 2, "#ffff00");
    colorGradient.addColorStop((1 / 7) * 3, "#00ff00");
    colorGradient.addColorStop((1 / 7) * 4, "#00ffff");
    colorGradient.addColorStop((1 / 7) * 5, "#0000ff");
    colorGradient.addColorStop((1 / 7) * 6, "#ff00ff");
    colorGradient.addColorStop(1, "#ff0000");

    this.context.fillStyle = colorGradient;
    this.context.beginPath();

    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
    this.context.fillStyle = this.saturation
      ? this.saturationGradient()
      : this.lightnessGradient();
    this.context.beginPath();
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
  }

  drawMainPoint(point: Coord): void {
    const [x, y] = point;
    this.clearCanvas();
    this.drawColorWheel();

    const distance = this.distance(this.center, point);
    const tan = Math.atan2(this.center[1] - y, this.center[0] - x);

    let x1 = this.center[0] - Math.cos(tan) * (distance - this.circleRadius);
    let y1 = this.center[1] - Math.sin(tan) * (distance - this.circleRadius);

    this.context.strokeStyle = "#000";
    this.context.fillStyle = "#000";
    this.context.lineWidth = this.drawWidth;

    this.context.beginPath();
    this.context.moveTo(...this.center);
    this.context.lineTo(x1, y1);
    this.context.closePath();
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(x, y, this.circleRadius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
    // this.context.fill();
  }

  drawSecondaryPoints(points: Coord[]): void {
    this.context.fillStyle = "#fff";
    this.context.strokeStyle = "#fff";
    for (let point of points) {
      const tan = Math.atan2(
        this.center[1] - point[1],
        this.center[0] - point[0]
      );

      const distance = this.distance(this.center, point);
      const x1 =
        this.center[0] - Math.cos(tan) * (distance - this.circleRadius);
      const y1 =
        this.center[1] - Math.sin(tan) * (distance - this.circleRadius);

      this.context.beginPath();
      this.context.moveTo(...this.center);
      this.context.lineTo(x1, y1);
      this.context.stroke();
      this.context.closePath();

      this.context.beginPath();
      this.context.arc(...point, this.circleRadius, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.closePath();
    }
  }

  drawManager(point: Coord, points: Array<Coord>): void {
    this.clearCanvas();
    this.drawColorWheel();
    this.drawMainPoint(point);
    this.drawSecondaryPoints(points);
  }

  drawBasedOnEvent(e: MouseEvent): void {
    const { offsetX: x, offsetY: y } = e;
    const mainPoint: Coord = [x, y];

    this.drawOnlyWheel();

    const manager = new PalletePoints(
      this,
      mainPoint,
      this.palleteType,
      this.saturation
    );

    const secondaryPoints = manager.parser();

    this.setMainColor({
      id: uuidV4(),
      color: PalletePoints.findPointColor(mainPoint, this.context),
      coord: [x, y],
    });
    this.setSecondaryColors(manager.secondaryColors);

    this.drawMainPoint(mainPoint);
    this.drawSecondaryPoints(secondaryPoints);
  }
  addEvents() {
    const { canvas } = this;
    const drawCallback = (e: MouseEvent) => this.drawBasedOnEvent(e);
    const removeCallback = () =>
      canvas.removeEventListener("mousemove", drawCallback);

    canvas.addEventListener("mousedown", (e) => {
      drawCallback(e);
      canvas.addEventListener("mousemove", drawCallback);
    });

    canvas.addEventListener("mouseout", removeCallback);
    canvas.addEventListener("mouseup", removeCallback);
  }
  drawOnlyWheel(): void {
    this.clearCanvas();
    this.drawColorWheel();
  }
}

export default DrawCanvas;
