import { useEffect, useRef, useCallback, useContext } from "react";
import { rectArrType } from "Types/CanvasTypes";
import { Tab } from "Types/GradgenBuilderTypes";
import { useUtils } from "hooks/useUtils";

import "./LinearCanvas.scss";
import { activeTabContext } from "context/ActiveTabContext";
import { useLoadImages } from "../../../hooks/useLoadImages";
import { PageTextContext } from "context/PageTextContext";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";

let rectArr: rectArrType = [];
let color: string = "#ffffff";

let name: string = "";

function LinearCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { activeTab: tab, setActiveTab: setTab } = useContext(activeTabContext);
  const { direction, stops, gradient } = tab;
  const { selectedColor } = tab ? tab : { selectedColor: "#ffffff" };

  const { data: screenWidth } = useContext(ScreenDimensionContext);

  const { data } = useContext(PageTextContext);

  const { transparentPattern } = useLoadImages(canvasRef);
  const getStartingPoint = useCallback(() => {
    return rectArr.reduce((acc: number, crr: any): number => {
      if ("width" in crr) {
        return acc + crr.width;
      }
      return acc;
    }, 0);
  }, []);

  const { clamp } = useUtils();

  const createGradient = useCallback(() => {
    let percentList = [];
    for (let i in rectArr) {
      let slice = rectArr.slice(0, parseInt(i));
      percentList.push(
        slice.reduce((acc, crr) => {
          return acc + crr.percent;
        }, 0)
      );
    }

    let grad = `linear-gradient(${direction || 90}deg, `;

    for (let i in rectArr) {
      if (stops) {
        if (parseInt(i) !== rectArr.length - 1) {
          grad += `${rectArr[i].color} ${percentList[i]}%, `;
        } else {
          grad += `${rectArr[i].color} 100%)`;
        }
      } else {
        grad += `${rectArr[i].color} ${percentList[i]}% ${
          percentList[parseInt(i) + 1] || 100
        }%, `;
      }
    }

    grad = grad.replace(/,\s$/, ")");

    setTab((prev: Tab) => {
      return {
        ...prev,
        gradient: grad,
      };
    });
  }, [direction, stops, setTab]);

  const drawLine = useCallback(
    (e: MouseEvent) => {
      let { offsetX: x } = e;
      const canvas = e.target;

      if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        x = clamp(x, 0, width);

        if (ctx && x > getStartingPoint()) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;

          if (color !== "transparent") {
            ctx.fillStyle = color;
          } else {
            ctx.fillStyle = transparentPattern as CanvasPattern;
          }
          ctx.clearRect(0, 0, width, height);

          ctx.beginPath();

          // Draw Ghost Rect
          if (color !== "transparent") {
            ctx.globalAlpha = 0.5;
          }
          ctx.moveTo(getStartingPoint(), 0);
          ctx.fillRect(0, 0, x, height);

          // Draw Line
          ctx.globalAlpha = 1;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);

          ctx.stroke();
          ctx.closePath();

          if (rectArr.length > 0) {
            drawRects(canvas);
          }
        }
      }
    },
    /* eslint-disable */
    [getStartingPoint, tab, selectedColor, transparentPattern]
    /* eslint-enable */
  );

  const pushRect = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        const { width } = e.target;
        let { offsetX: x } = e;
        x = clamp(x, 0, width);
        const rectWidth = x - getStartingPoint();
        if (rectWidth > 0) {
          const obj = {
            color,
            start: getStartingPoint(),
            width: rectWidth,
            percent: Math.round((rectWidth / width) * 100),
          };
          rectArr.push(obj);
          setTab((prev: Tab) => {
            return {
              ...prev,
              shapeArr: rectArr,
            };
          });

          drawRects(e.target);
          createGradient();
        }
      }
    },
    /* eslint-disable */
    [getStartingPoint, createGradient, setTab]
    /* eslint-enable */
  );

  const drawRects = useCallback(
    (canvas: HTMLCanvasElement, clear = false) => {
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;
      if (ctx) {
        ctx.strokeStyle = "#fff";
        ctx.globalAlpha = 1;
        if (clear) {
          ctx.clearRect(0, 0, width, height);
        }
        for (let i of rectArr) {
          if (i.color !== "transparent") {
            ctx.fillStyle = i.color;
          } else {
            ctx.fillStyle = transparentPattern as CanvasPattern;
          }

          ctx.beginPath();
          ctx.fillRect(i.start, 0, i.width, height);
          ctx.stroke();
          ctx.closePath();
        }
      }
    },
    [transparentPattern]
  );

  function removePrev() {
    const { current: div } = previewRef;
    if (div instanceof HTMLDivElement) {
      div.classList.add("hide");
    }
  }

  function showPrev() {
    const { current: div } = previewRef;

    if (div instanceof HTMLDivElement) {
      div.classList.toggle("hide");
    }
  }

  const clearAll = useCallback(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      const { width, height } = canvas;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        rectArr = [];

        setTab((prev: Tab) => {
          return {
            ...prev,
            shapeArr: [],
            direction: 90,
            gradient: "",
          };
        });

        removePrev();
      }
    }
  }, [canvasRef, setTab]);

  const clearCanvas = useCallback(() => {
    const { current: canvas } = canvasRef;

    if (canvas instanceof HTMLCanvasElement) {
      const { width, height } = canvas;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        rectArr = [];
        setTab((prev: Tab) => {
          return {
            ...prev,
            percents: [],
            shapeArr: [],
            gradient: "",
          };
        });
      }
    }
  }, [canvasRef, setTab]);

  useEffect(() => {
    createGradient();

    const { current: div } = previewRef;

    if (div) {
      div.style.backgroundImage = gradient || "";
    }
  }, [direction, stops, gradient, createGradient, previewRef]);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawRects(canvas);
      }
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("click", pushRect);
      canvas.addEventListener("mouseout", () => {
        drawRects(canvas, true);
      });
    }
    /* eslint-disable */
  }, [canvasRef, drawLine, pushRect]);
  /* eslint-enable */

  useEffect(() => {
    if (selectedColor && selectedColor !== color) {
      color = selectedColor;
    }
  }, [selectedColor]);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (tab.shapeArr && tab.type === "linear") {
      rectArr = (tab.shapeArr as rectArrType) || [];

      if (canvas) {
        drawRects(canvas);
        if (!tab.gradient) {
          createGradient();
        }
      }
    }
  }, [tab, canvasRef, drawRects, createGradient]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (canvas instanceof HTMLCanvasElement) {
      const ctx = canvas.getContext("2d");
      if (ctx && tab.name !== name) {
        name = tab.name;
        rectArr = [];
        drawRects(canvas, true);
      }
    }
    /* eslint-disable */
  }, [tab, canvasRef]);
  /* eslint-enable */

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
        <button onClick={clearAll} className="canvas-container__button">
          {data.gradientPage.canvasButtonsText[0]}
        </button>
        <button onClick={showPrev} className="canvas-container__button">
          {data.gradientPage.canvasButtonsText[1]}
        </button>
        <button onClick={clearCanvas} className="canvas-container__button">
          {data.gradientPage.canvasButtonsText[2]}
        </button>
      </div>
      <div
        className="canvas-container__preview hide"
        onClick={removePrev}
        ref={previewRef}
        style={{ backgroundImage: tab.gradient || "" }}
      ></div>
    </div>
  );
}

export default LinearCanvas;
