import {
  ColorCoord,
  PalleteGen,
  palleteGenContext,
} from "context/PalleteGenContext";
import { RefObject, useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import DrawCanvas from "classes/DrawCanvas";

function useDrawCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  drawWidth: number
) {
  const [drawObj, setDrawObj] = useState<DrawCanvas>();
  const [mainColor, setMainColor] = useState<ColorCoord>({
    color: "#ff0000",
    id: uuidV4(),
    coord: [150, 0],
  });
  const [secondaryColors, setSecondaryColors] = useState<ColorCoord[]>([]);

  const { pallete, setPallete } = useContext(palleteGenContext);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvas) {
      setDrawObj(
        new DrawCanvas(
          canvas,
          drawWidth,
          pallete.type,
          setMainColor,
          setSecondaryColors
        )
      );
    }
    /* eslint-disable */
  }, [canvasRef]);
  /* eslint-enable */

  useEffect(() => {
    setPallete((prev: PalleteGen): PalleteGen => {
      return {
        ...prev,
        mainColor,
        secondaryColors,
      };
    });
    /* eslint-disable */
  }, [mainColor, secondaryColors]);
  /* eslint-enable */

  useEffect(() => {
    if (pallete.type && drawObj) {
      drawObj.palleteType = pallete.type;
      drawObj.saturation = pallete.saturationGrad;
      drawObj.drawColorWheel();
    }
    /* eslint-disable */
  }, [pallete.type, pallete.saturationGrad]);
  /* eslint-enable */

  return { drawObj: drawObj as DrawCanvas };
}

export default useDrawCanvas;
