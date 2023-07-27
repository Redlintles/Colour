import "./ColorPicker.scss";
import { useRef, useEffect, useState, useContext, useCallback } from "react";

import { ColorContext } from "context/ColorContext";

import ColorStrip from "../ColorStrip/ColorStrip";
import { canvasOBJ, HSLColor } from "Types/PickerTypes";
import { useUtils } from "hooks/useUtils";
import ColorParser from "classes/ColorParser";
import { PageTextContext } from "context/PageTextContext";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";

function ColorPicker() {
  const pickerRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<HSLColor>({
    hue: 0,
    saturation: 100,
    lightness: 50,
  });
  const [lum, setLum] = useState<number>(150);
  const { color: selectedColor, setColor: setSelectedColor } =
    useContext(ColorContext);
  const { clamp } = useUtils();

  const { data } = useContext(PageTextContext);
  const { data: screenWidth } = useContext(ScreenDimensionContext);

  const drawCanvas = useCallback(() => {
    const { current: canvas } = pickerRef;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;

      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        const gradBlack = ctx.createLinearGradient(0, 0, 0, height);

        for (let i = 0; i <= 1; i += 0.1) {
          if (i < 1.1) {
            gradBlack.addColorStop(i, `rgba(128,128,128,${i})`);
          }
        }

        const grad = ctx.createLinearGradient(0, 0, width, 0);

        grad.addColorStop(0, "#f00");
        grad.addColorStop(1 / 6, "#ff0");
        grad.addColorStop((1 / 6) * 2, "#0f0");
        grad.addColorStop((1 / 6) * 3, "#0ff");
        grad.addColorStop((1 / 6) * 4, "#00f");
        grad.addColorStop((1 / 6) * 5, "#f0f");
        grad.addColorStop((1 / 6) * 6, "#f00");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = gradBlack;

        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [pickerRef]);

  const drawCircle = useCallback(
    (e: MouseEvent | canvasOBJ) => {
      if (e.target instanceof HTMLCanvasElement) {
        const canvas = e.target;
        const { width, height } = canvas;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          drawCanvas();

          ctx.lineWidth = 2;

          let hue = (e.offsetX / width) * 100;
          hue = Math.round((360 / 100) * hue);
          let sat = 100 - Math.round((e.offsetY / height) * 100);

          // ctx.strokeStyle = "#FF00FF";
          ctx.beginPath();
          ctx.arc(e.offsetX, e.offsetY, 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
          setColor((prev) => {
            return {
              ...prev,
              hue: clamp(hue, 0, 360),
              saturation: clamp(sat, 0, 100),
            };
          });
        }
      }
    },
    /* eslint-disable */
    [setColor, drawCanvas]
    /* eslint-enable */
  );

  const mountColor = useCallback(() => {
    setSelectedColor({
      color: `hsl(${color.hue}deg,${color.saturation}%,${color.lightness}%)`,
      modifiedBy: "click",
    });
  }, [setSelectedColor, color]);

  useEffect(() => {
    const { current: canvas } = pickerRef;
    if (selectedColor.modifiedBy !== "input") {
      return;
    }

    if (canvas) {
      const { width, height } = canvas;
      let [hue, sat, lum] = new ColorParser(selectedColor.color).hsl.components;

      let xPercent = Math.round((hue / 360) * 100);
      let x = (width / 100) * xPercent;

      let yPercent = Math.round((height / 100) * sat);
      let y = height - yPercent;

      let lumPercent = Math.round((height / 100) * lum);
      let lumY = height - lumPercent;

      if (pickerRef.current) {
        drawCircle({
          target: pickerRef.current,
          offsetX: x,
          offsetY: y,
        });
      }

      setLum(lumY);
    }
  }, [selectedColor, pickerRef, drawCircle]);

  useEffect(() => {
    const { current: canvas } = pickerRef;

    if (canvas) {
      drawCanvas();
      const callback = () => {
        canvas.removeEventListener("mousemove", drawCircle);
      };

      canvas.addEventListener("mousedown", (e) => {
        drawCircle(e);
        canvas.addEventListener("mousemove", drawCircle);
      });
      canvas.addEventListener("mouseup", callback);
      canvas.addEventListener("mouseout", callback);
    }
  }, [pickerRef, drawCanvas, drawCircle]);

  useEffect(() => {
    mountColor();
  }, [color, mountColor]);

  return (
    <section className="color-picker">
      <div className="color-picker__picker">
        {screenWidth.width < screenWidth.sm && (
          <canvas
            className="color-picker__canvas"
            ref={pickerRef}
            width="250"
            height="250"
          >
            <p>{data.canvasNotSupported}</p>
          </canvas>
        )}
        {screenWidth.width >= screenWidth.sm && (
          <canvas
            className="color-picker__canvas"
            ref={pickerRef}
            width="300"
            height="300"
          >
            <p>{data.canvasNotSupported}</p>
          </canvas>
        )}
        <ColorStrip hue={color.hue} setter={setColor} lightness={lum} />
      </div>
    </section>
  );
}

export default ColorPicker;
