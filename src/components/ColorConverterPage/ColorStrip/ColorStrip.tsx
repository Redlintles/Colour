import React from "react";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { HSLColor } from "Types/PickerTypes";
import { useUtils } from "hooks/useUtils";
import { PageTextContext } from "context/PageTextContext";

import "./ColorStrip.scss";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";

type Props = {
  hue: number;
  setter: React.Dispatch<React.SetStateAction<HSLColor>>;
  lightness: number;
};

function ColorStrip({ hue, setter, lightness }: Props) {
  const stripRef = useRef<HTMLCanvasElement>(null);
  const [lastClickOffset, setLastClickOffset] = useState<number>(0);
  const { clamp } = useUtils();
  const { data: screenWidth } = useContext(ScreenDimensionContext);

  const { data } = useContext(PageTextContext);

  const drawLineAtCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!lastClickOffset) {
        return;
      }
      const { width, height } = canvas;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let lum =
          100 -
          Math.round(
            (lastClickOffset /
              (screenWidth.width <= screenWidth.sm ? width : height)) *
              100
          );

        ctx.lineWidth = 2;
        ctx.beginPath();
        if (screenWidth.width <= screenWidth.sm) {
          ctx.moveTo(lastClickOffset, 0);
          ctx.lineTo(lastClickOffset, height);
        } else {
          ctx.moveTo(0, lastClickOffset);
          ctx.lineTo(width, lastClickOffset);
        }
        ctx.stroke();
        ctx.closePath();

        lum = lum > 100 ? 100 : lum;
        lum = lum < 0 ? 0 : lum;

        setter((prev) => {
          return {
            ...prev,
            lightness: clamp(lum, 0, 100),
          };
        });
      }
    },
    /* eslint-disable */
    [lastClickOffset, setter, screenWidth]
    /*eslint-enable */
  );

  const drawStrip = useCallback(
    (canvas: HTMLCanvasElement) => {
      const { width, height } = canvas;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        let grad1;
        if (screenWidth.width <= screenWidth.sm) {
          grad1 = ctx.createLinearGradient(0, 0, width, 0);
        } else {
          grad1 = ctx.createLinearGradient(0, 0, 0, height);
        }

        for (let i = 0; i <= 0.5; i += 0.5) {
          let fillColor =
            screenWidth.width <= screenWidth.sm
              ? `rgba(0,0,0,${1 - i * 2})`
              : `rgba(255,255,255,${1 - i * 2})`;
          grad1.addColorStop(i, fillColor);
        }

        for (let i = 0; i <= 10; i++) {
          let offset = 0.5 + 0.05 * i;
          let fillColor =
            screenWidth.width <= screenWidth.sm
              ? `rgba(255,255,255,${i / 10}`
              : `rgba(0,0,0,${i / 10}`;
          grad1.addColorStop(offset, fillColor);
        }

        ctx.fillStyle = `hsla(${hue}deg,100%,50%,100%)`;

        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = grad1;

        ctx.fillRect(0, 0, width, height);

        drawLineAtCanvas(canvas);
      }
    },
    [drawLineAtCanvas, hue, screenWidth]
  );

  useEffect(() => {
    const { current: canvas } = stripRef;

    if (canvas) {
      drawStrip(canvas);
      const callback = (e: MouseEvent) => {
        setLastClickOffset(
          screenWidth.width <= screenWidth.sm ? e.offsetX : e.offsetY
        );
      };

      canvas.addEventListener("mousedown", (e) => {
        callback(e);
        canvas.addEventListener("mousemove", callback);
      });

      canvas.addEventListener("mouseup", (e) => {
        canvas.removeEventListener("mousemove", callback);
      });
    }
  }, [hue, stripRef, lastClickOffset, drawStrip, screenWidth]);

  useEffect(() => {
    setLastClickOffset(lightness);
  }, [lightness]);

  return (
    <div className="color-strip">
      {screenWidth.width < screenWidth.sm && (
        <canvas
          height="50"
          width="250"
          ref={stripRef}
          className="color-strip__canvas"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}
      {screenWidth.width >= screenWidth.sm && (
        <canvas
          width="50"
          height="300"
          ref={stripRef}
          className="color-strip__canvas"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}
    </div>
  );
}

export default ColorStrip;
