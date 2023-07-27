import { useRef, useEffect, useContext, useCallback } from "react";
import { activeTabContext } from "context/ActiveTabContext";
import { arcArrType, Arc } from "Types/CanvasTypes";
import { Tab } from "../../../Types/GradgenBuilderTypes";
import { useLoadImages } from "hooks/useLoadImages";
import { PageTextContext } from "context/PageTextContext";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";
import { Coord } from "../../../Types/GlobalTypes";

const lastCoord: Coord = [0, 0];

let color: string = "#ffffff";
let arcArr: arcArrType = [];

function ConicCanvas() {
  const { activeTab: tab, setActiveTab: setTab } = useContext(activeTabContext);
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useContext(PageTextContext);

  const { transparentPattern } = useLoadImages(canvasRef);
  const { data: screenWidth } = useContext(ScreenDimensionContext);

  function createGradient() {
    let grad = "conic-gradient(";

    if (!arcArr || !arcArr.length) {
      return;
    }

    const { stops } = tab;
    const percentList: number[] = arcArr
      .map((item, index) => {
        let slice = arcArr.slice(0, index);
        return slice.reduce((acc: number, crr: Arc) => {
          return acc + crr.percent;
        }, 0);
      })
      .map((item) => {
        return parseInt(((item / 100) * 360).toString());
      });

    if (arcArr.length === 1) {
      let { color } = arcArr[0];
      grad += `${color}, ${color})`;
      setTab((prev: Tab): Tab => {
        return {
          ...prev,
          gradient: grad,
        };
      });
      return;
    }

    if (stops) {
      let first = arcArr[0].color;
      let last = arcArr[arcArr.length - 1].color;

      for (let i = 0; i < arcArr.length - 1; i++) {
        grad += `${arcArr[i].color}, `;
      }
      grad += `${last}, ${first})`;
    } else {
      for (let i = 0; i < arcArr.length; i++) {
        if (percentList[i + 1]) {
          grad += `${arcArr[i].color} ${percentList[i]}deg ${
            percentList[i + 1]
          }deg, `;
        } else {
          grad += `${arcArr[i].color} ${percentList[i]}deg 360deg)`;
        }
      }
    }

    console.log(grad);

    setTab((prev: Tab) => {
      return {
        ...prev,
        gradient: grad,
      };
    });
  }

  function calcPercent(x: number, y: number, center: Coord): number[] {
    let startAngle: number = 0 * Math.PI;
    let endAngle = Math.atan2(center[1] - y, center[0] - x);
    if (arcArr && arcArr.length) {
      startAngle = arcArr[arcArr.length - 1].endAngle;
    }

    let start =
      startAngle < 0 ? 2 * Math.PI - Math.abs(startAngle) : startAngle;
    let end = endAngle < 0 ? 2 * Math.PI - Math.abs(endAngle) : endAngle;

    let percent: number = Math.abs(((end - start) * 100) / (2 * Math.PI));
    let leftToDraw =
      100 -
      arcArr.reduce((acc: number, crr: Arc) => {
        return acc + crr.percent;
      }, 0);
    return [startAngle, endAngle, parseFloat(percent.toFixed(2)), leftToDraw];
  }

  const drawArcs = useCallback(
    (canvas: HTMLCanvasElement, clear: boolean = false): void => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { width, height } = canvas;
        const center: Coord = [width / 2, height / 2];
        if (clear) {
          ctx.clearRect(0, 0, width, height);
        }
        if (arcArr && arcArr.length) {
          ctx.save();
          ctx.strokeStyle = "#ffffff";
          for (let i of arcArr) {
            ctx.beginPath();
            if (i.color !== "transparent") {
              ctx.fillStyle = i.color;
            } else {
              ctx.fillStyle = transparentPattern as CanvasPattern;
            }
            ctx.moveTo(...center);
            ctx.arc(...center, center[0], i.startAngle, i.endAngle);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
          }
          ctx.restore();
        }
      }
    },
    [transparentPattern]
  );

  const pushArc = useCallback(
    (e: MouseEvent): void => {
      const { target: canvas, offsetX: x, offsetY: y } = e;
      const [lastX, lastY] = lastCoord;
      if (x === lastX && y === lastY) {
        return;
      }

      if (canvas instanceof HTMLCanvasElement) {
        const { width, height } = canvas;
        const canvasCenter: Coord = [width / 2, height / 2];
        const ctx = canvas.getContext("2d");
        if (ctx) {
          let [startAngle, endAngle, percent, leftToDraw] = calcPercent(
            x,
            y,
            canvasCenter
          );

          if (percent <= leftToDraw) {
            let obj: Arc = {
              color,
              startAngle,
              endAngle,
              percent: parseFloat(percent.toFixed(2)),
            };

            arcArr.push(obj);
            setTab((prev: Tab): Tab => {
              return {
                ...prev,
                shapeArr: arcArr,
              };
            });

            drawArcs(canvas);
            createGradient();
          }
        }
      }
    },
    /* eslint-disable */
    [drawArcs, createGradient]
    /* eslint-enable */
  );

  const drawLine = useCallback(
    (e: MouseEvent): void => {
      const { target: canvas, offsetX: x, offsetY: y } = e;
      if (canvas instanceof HTMLCanvasElement) {
        const { width, height } = canvas;
        const ctx = canvas.getContext("2d");

        const canvasCenter: Coord = [width / 2, height / 2];

        if (ctx) {
          let [startAngle, endAngle, percent, leftToDraw] = calcPercent(
            x,
            y,
            canvasCenter
          );

          ctx.clearRect(0, 0, width, height);
          if (percent <= leftToDraw) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            if (color !== "transparent") {
              ctx.fillStyle = color;
            } else {
              ctx.fillStyle = transparentPattern as CanvasPattern;
            }
            ctx.strokeStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(...canvasCenter);
            ctx.arc(...canvasCenter, canvasCenter[0], startAngle, endAngle);
            ctx.lineTo(...canvasCenter);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
          }
          drawArcs(canvas);
        }
      }
    },
    [drawArcs, transparentPattern]
  );

  const clearCanvas = useCallback((): void => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        arcArr = [];
        setTab((prev: Tab): Tab => {
          return {
            ...prev,
            gradient: "",
            shapeArr: [],
          };
        });
      }
    }
    /* eslint-disable */
  }, [canvasRef]);
  /* eslint-enable */

  function clearAll(): void {}

  function removePrev(): void {
    const { current: preview } = previewRef;

    if (preview instanceof HTMLDivElement) {
      preview.classList.remove("hide");
    }
  }

  function showPrev(): void {
    const { current: preview } = previewRef;

    if (preview instanceof HTMLDivElement) {
      preview.classList.toggle("hide");
    }
  }

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas instanceof HTMLCanvasElement) {
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("click", pushArc);
      canvas.addEventListener("mouseout", (e) => drawArcs(canvas, true));
    }
    /* eslint-disable */
  }, [canvasRef]);
  /* eslint-enable */

  useEffect(() => {
    if (tab.selectedColor && tab.selectedColor !== color) {
      color = tab.selectedColor;
    }
  }, [tab.selectedColor]);

  useEffect(() => {
    createGradient();
    /* eslint-disable */
  }, [tab.stops]);
  /* eslint-enable */

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      if (tab.shapeArr && tab.shapeArr.length && tab.shapeArr !== arcArr) {
        arcArr = tab.shapeArr as arcArrType;
        drawArcs(canvas);
      }
    }
    /* eslint-disable */
  }, [tab, canvasRef]);
  /* eslint-enable */

  useEffect(() => {
    const { current: preview } = previewRef;
    if (preview instanceof HTMLDivElement && tab.gradient) {
      let image = preview.style.backgroundImage;
      if (tab.gradient !== image) {
        preview.style.backgroundImage = tab.gradient;
      }
    }
  }, [tab.gradient]);

  return (
    <>
      <div className="canvas-container">
        {screenWidth.width < screenWidth.sm && (
          <canvas
            className="canvas-container__canvas"
            width="250"
            height="250"
            style={{ transform: "rotate(-90deg)" }}
            ref={canvasRef}
          >
            <p>{data.canvasNotSupported}</p>
          </canvas>
        )}
        {screenWidth.width >= screenWidth.sm && (
          <canvas
            className="canvas-container__canvas"
            width="300"
            height="300"
            style={{ transform: "rotate(-90deg)" }}
            ref={canvasRef}
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
          <button className="canvas-container__button" onClick={clearCanvas}>
            {data.gradientPage.canvasButtonsText[2]}
          </button>
        </div>
        <div
          className="canvas-container__preview hide"
          ref={previewRef}
          onClick={removePrev}
        ></div>
      </div>
    </>
  );
}

export default ConicCanvas;
