import { useEffect, useState, RefObject } from "react";

export function useLoadImages(canvasRef: RefObject<HTMLCanvasElement>) {
  let [transparentPattern, setTransparentPattern] = useState<CanvasPattern>();

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img: HTMLImageElement = new Image();

        img.src = "/transparent.png";
        img.onload = () => {
          if (ctx) {
            const ptn = ctx.createPattern(img, "repeat");
            if (ptn) {
              setTransparentPattern(ptn);
            }
          }
        };
      }
    }
  }, [canvasRef]);

  return { transparentPattern };
}
