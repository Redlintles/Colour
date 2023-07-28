import { useRef, useEffect, useCallback, useContext, useState } from "react";
import { activeTabContext } from "context/ActiveTabContext";
import { Circle, circleArrType } from "Types/CanvasTypes";
import { Tab } from "Types/GradgenBuilderTypes";

import "./RadialCanvas.scss";
import { useUtils } from "hooks/useUtils";
import { useLoadImages } from "hooks/useLoadImages";
import { PageTextContext } from "context/PageTextContext";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";

let circleArr: circleArrType = [];

let selectedColor = "#ffffff";

function RadialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { activeTab: tab, setActiveTab: setTab } = useContext(activeTabContext);
  const { gradient } = tab;
  const [stops, setStops] = useState<boolean>(tab.stops || false);
  const [center, setCenter] = useState<[number, number]>(
    tab.center || [50, 50]
  );
  const { clamp } = useUtils();

  const { data: screenWidth } = useContext(ScreenDimensionContext);

  const { data } = useContext(PageTextContext);

  const { transparentPattern } = useLoadImages(canvasRef);

  function circleRadius(x: number, y: number, width: number, height: number) {
    let center = [width / 2, height / 2];
    const eq = (x - center[0]) ** 2 + (y - center[1]) ** 2;
    return Math.sqrt(eq);
  }

  const drawCircles = useCallback(
    (canvas: HTMLCanvasElement, clear = false) => {
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;
      if (ctx) {
        if (clear) {
          ctx.clearRect(0, 0, width, height);
        }
        for (let i of circleArr) {
          ctx.beginPath();
          if (i.color !== "transparent") {
            ctx.fillStyle = i.color;
          } else {
            ctx.fillStyle = transparentPattern as CanvasPattern;
          }
          ctx.strokeStyle = "#fff";
          ctx.arc(width / 2, height / 2, i.radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      }
    },
    [transparentPattern]
  );

  const drawLine = useCallback(
    (e: MouseEvent) => {
      const { target: canvas, offsetX: x, offsetY: y } = e;

      if (canvas instanceof HTMLCanvasElement) {
        const { width, height } = canvas;
        const ctx = canvas.getContext("2d");
        const lastRadius = circleArr[0] ? circleArr[0].radius : 0;
        const radius = clamp(circleRadius(x, y, width, height), 0, width / 2);

        if (ctx && radius > lastRadius) {
          ctx.clearRect(0, 0, width, height);
          ctx.save();
          if (selectedColor !== "transparent") {
            ctx.fillStyle = selectedColor;
          } else {
            ctx.fillStyle = transparentPattern as CanvasPattern;
          }
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();

          ctx.restore();

          if (circleArr.length > 0) {
            drawCircles(canvas);
          }
        }
      }
    },
    [drawCircles, clamp, transparentPattern]
  );

  const createGradient = useCallback(() => {
    let [cx, cy] = center;

    let grad = `radial-gradient(circle at ${
      cx === 50 && cy === 50 ? "center" : `${cx}% ${cy}%`
    }, `;
    const percentList = circleArr.map((item, i) => {
      const slice = circleArr.slice(0, i);
      return slice.reduce((acc, crr) => {
        return acc + crr.percent;
      }, 0);
    });

    if (circleArr.length === 1) {
      let { color } = circleArr[0];

      grad += `${color}, ${color})`;

      return setTab((prev: Tab) => {
        return {
          ...prev,
          gradient: grad,
        };
      });
    }

    if (stops) {
      percentList.shift();
      for (let i = 0; i < circleArr.length; i++) {
        const circle = circleArr[circleArr.length - 1 - i];
        if (i !== circleArr.length - 1) {
          grad += `${circle.color} ${percentList[i]}%, `;
        } else {
          grad += `${circle.color} 100%)`;
        }
      }
    } else {
      for (let i = 0; i < circleArr.length; i++) {
        const circle = circleArr[circleArr.length - 1 - i];
        if (i !== circleArr.length - 1) {
          grad += `${circle.color} ${percentList[i]}% ${percentList[i + 1]}%, `;
        } else {
          grad += `${circle.color} ${percentList[i]}% 100%)`;
        }
      }
    }

    setTab((prev: Tab) => {
      return {
        ...prev,
        gradient: grad,
      };
    });
  }, [center, stops, setTab]);

  const pushCircle = useCallback(
    (e: MouseEvent) => {
      const { target: canvas, offsetX: x, offsetY: y } = e;
      if (canvas instanceof HTMLCanvasElement) {
        const { width, height } = canvas;
        const lastRadius = circleArr[0] ? circleArr[0].radius : 0;
        const radius = clamp(circleRadius(x, y, width, height), 0, width / 2);

        if (radius > lastRadius) {
          const obj: Circle = {
            color: selectedColor,
            radius: Math.floor(radius),
            percent: Math.floor(((radius - lastRadius) / width / 2) * 100),
          };
          circleArr.unshift(obj);
          drawCircles(canvas);
          createGradient();
        }
      }
    },
    [drawCircles, createGradient, clamp]
  );

  const showPrev = useCallback(() => {
    const { current: prev } = previewRef;
    if (prev) {
      prev.classList.toggle("hide");
    }
  }, [previewRef]);

  const removePrev = useCallback(() => {
    const { current: prev } = previewRef;

    if (prev) {
      prev.classList.add("hide");
    }
  }, [previewRef]);

  const clearCanvas = useCallback(
    (clear: boolean = false) => {
      const { current: canvas } = canvasRef;
      if (canvas) {
        const { width, height } = canvas;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          if (clear) {
            circleArr = [];
            setTab((prev: Tab) => {
              return {
                ...prev,
                gradient: "",
                percents: [],
                shapeArr: [],
              };
            });
          } else {
            drawCircles(canvas);
          }
          removePrev();
        }
      }
    },
    [canvasRef, drawCircles, removePrev, setTab]
  );

  const clearAll = useCallback(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      clearCanvas(true);
      circleArr = [];
      setTab((prev: Tab) => {
        return {
          ...prev,
          colors: [],
          percents: [],
          shapeArr: [],
          center: [50, 50],
          gradient: "",
        };
      });
    }
  }, [canvasRef, setTab, clearCanvas]);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("click", pushCircle);
      canvas.addEventListener("mouseout", () => drawCircles(canvas, true));
    }
    /* eslint-disable */
  }, [canvasRef, drawLine, pushCircle, clearCanvas]);
  /* eslint-enable */

  useEffect(() => {
    if (tab.selectedColor) {
      selectedColor = tab.selectedColor;
    } else {
      selectedColor = "#ffffff";
    }
  }, [tab]);

  useEffect(() => {
    if (gradient && previewRef.current) {
      const { current: prev } = previewRef;

      if (prev) {
        prev.style.backgroundImage = gradient;
      }
    }
  }, [gradient, previewRef]);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (tab && tab.type === "radial") {
      circleArr = (tab.shapeArr as circleArrType) || [];

      if (canvas) {
        drawCircles(canvas);
        if (!tab.gradient) {
          createGradient();
        }
      }
    }
  }, [tab, canvasRef, createGradient, drawCircles]);

  useEffect(() => {
    const { center: tabCenter, stops: tabStops } = tab;

    setCenter(tabCenter as [number, number]);
    setStops(tabStops as boolean);
  }, [tab]);

  useEffect(() => {
    createGradient();
  }, [createGradient]);

  return (
    <div className="canvas-container">
      {screenWidth.width < screenWidth.sm && (
        <canvas
          width="250"
          height="250"
          ref={canvasRef}
          className="canvas-container__canvas"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}
      {screenWidth.width >= screenWidth.sm && (
        <canvas
          width="300"
          height="300"
          ref={canvasRef}
          className="canvas-container__canvas"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}
      <div>
        <button className="canvas-container__button" onClick={clearAll}>
          {data.gradientPage.canvasButtonsText[0]}
        </button>
        <button className="canvas-container__button" onClick={showPrev}>
          {data.gradientPage.canvasButtonsText[1]}
        </button>
        <button
          className="canvas-container__button"
          onClick={() => clearCanvas(true)}
        >
          {data.gradientPage.canvasButtonsText[2]}
        </button>
      </div>
      <div
        className="canvas-container__preview hide"
        ref={previewRef}
        onClick={removePrev}
      ></div>
    </div>
  );
}

export default RadialCanvas;
