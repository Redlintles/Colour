import { PalleteGen, palleteGenContext } from "context/PalleteGenContext";
import { useRef, useEffect, useContext, useState } from "react";

import "./PalleteGenPicker.scss";

import useDrawCanvas from "hooks/useDrawCanvas";
import CloseBtn from "../../Frame/CloseBtn/CloseBtn";
import PalleteColorList from "../PalleteColorList/PalleteColorList";
import PalleteCSSCode from "../PalleteCSSCode/PalleteCSSCode";
import { ScreenDimensionContext } from "context/ScreenDimensionContext";
import { PageTextContext } from "context/PageTextContext";

const drawWidth = 5;
function PalleteGenPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pallete, setPallete } = useContext(palleteGenContext);
  const { drawObj } = useDrawCanvas(canvasRef, drawWidth);
  const { data: screenWidth } = useContext(ScreenDimensionContext);
  const { data } = useContext(PageTextContext);

  const [cssCodeToggler, setCssCodeToggler] = useState<boolean>(false);
  const [colorListToggler, setColorListToggler] = useState<boolean>(false);

  useEffect(() => {
    setPallete((prev: PalleteGen): PalleteGen => {
      return {
        ...prev,
        canvasOBJ: drawObj,
      };
    });
    /* eslint-disable */
  }, [drawObj]);
  /* eslint-enable */
  return (
    <div className="picker">
      {screenWidth.width < screenWidth.sm && (
        <canvas
          width="250"
          height="250"
          ref={canvasRef}
          className="picker__picker"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}
      {screenWidth.width >= screenWidth.sm && (
        <canvas
          width="300"
          height="300"
          ref={canvasRef}
          className="picker__picker"
        >
          <p>{data.canvasNotSupported}</p>
        </canvas>
      )}

      {colorListToggler && (
        <div className="picker-banner">
          <div className="picker-banner__header">
            <h3>{data.palletePage.colorListTitle}</h3>
            <CloseBtn toggler={setColorListToggler} />
          </div>
          <PalleteColorList />
        </div>
      )}
      {cssCodeToggler && (
        <div className="picker-banner">
          <div className="picker-banner__header">
            <h3>{data.palletePage.cssCopyTitle}</h3>
            <CloseBtn toggler={setCssCodeToggler} />
          </div>
          <PalleteCSSCode />
        </div>
      )}
      <div className="picker-buttons">
        <button
          onClick={() => {
            setColorListToggler(!colorListToggler);
            setCssCodeToggler(false);
          }}
          className="picker-buttons__btn"
        >
          Lista de Cores
        </button>
        <button
          onClick={() => {
            setCssCodeToggler(!cssCodeToggler);
            setColorListToggler(false);
          }}
          className="picker-buttons__btn"
        >
          Código CSS
        </button>
        <button
          onClick={() => {
            if (pallete.canvasOBJ) {
              pallete.canvasOBJ.saturation = !pallete.saturationGrad;

              setPallete((prev: PalleteGen): PalleteGen => {
                return {
                  ...prev,
                  saturationGrad: !prev.saturationGrad,
                };
              });
            }
          }}
          className="picker-buttons__btn"
        >
          {pallete.saturationGrad ? "Lightness" : "Saturation"}
        </button>
      </div>
    </div>
  );
}

export default PalleteGenPicker;
