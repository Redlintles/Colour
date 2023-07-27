import { palleteGenContext } from "context/PalleteGenContext";
import { useContext, useEffect } from "react";
import "./PalleteGenColorBar.scss";
import PalleteGenColor from "components/PalleteGen/PalleteGenColor/PalleteGenColor";

import { ColorCoord } from "../../../context/PalleteGenContext";
import {
  ColorBarContext,
  ColorBarContextSchema,
} from "context/ColorBarContext";
import PalletePoints from "classes/PalletePoints";

function PalleteGenColorBar() {
  const { pallete } = useContext(palleteGenContext);
  const { colorBarData, setColorBarData } = useContext(ColorBarContext);

  useEffect(() => {
    if (pallete.canvasOBJ) {
      setColorBarData((): ColorBarContextSchema => {
        return {
          mainColor: pallete.mainColor,
          secondaryColors: pallete.secondaryColors,
          modifiedBy: "canvas",
          palleteType: pallete.type,
        };
      });
    }
    /* eslint-disable */
  }, [pallete.mainColor, pallete.secondaryColors]);
  useEffect(() => {
    if (pallete.canvasOBJ) {
      const finder = new PalletePoints(
        pallete.canvasOBJ,
        [150, 0],
        "analog",
        pallete.saturationGrad
      );

      pallete.canvasOBJ.drawMainPoint([150, 0]);
      pallete.canvasOBJ.drawSecondaryPoints(finder.points);

      setColorBarData((prev: ColorBarContextSchema): ColorBarContextSchema => {
        return {
          ...prev,
          secondaryColors: finder.secondaryColors,
        };
      });
    }
    /* eslint-disable */
  }, [pallete.canvasOBJ]);
  /* eslint-enable */
  useEffect(() => {
    if (colorBarData.modifiedBy === "color" && pallete.canvasOBJ) {
      const { coord } = colorBarData.mainColor;

      const finder = new PalletePoints(
        pallete.canvasOBJ,
        coord,
        pallete.type,
        pallete.saturationGrad
      );

      setColorBarData((prev: ColorBarContextSchema): ColorBarContextSchema => {
        return {
          mainColor: colorBarData.mainColor,
          secondaryColors: finder.secondaryColors,
          modifiedBy: "recalc",
          palleteType: pallete.type,
        };
      });
    }
    /* eslint-disable */
  }, [colorBarData.mainColor, pallete.canvasOBJ, pallete.type]);
  /* eslint-enable */

  useEffect(() => {
    if (colorBarData.modifiedBy === "recalc" && pallete.canvasOBJ) {
      const { coord } = colorBarData.mainColor;
      const points = colorBarData.secondaryColors.map((item) => item.coord);

      pallete.canvasOBJ.drawManager(coord, points);
    }
    /* eslint-disable */
  }, [colorBarData]);
  /* eslint-enable */
  return (
    <div className="color-bar">
      <PalleteGenColor
        initialColor={colorBarData.mainColor}
        isMainColor={true}
      />

      {colorBarData.secondaryColors &&
        colorBarData.secondaryColors.length &&
        colorBarData.secondaryColors.map((item: ColorCoord, index: number) => (
          <PalleteGenColor
            key={item.id}
            initialColor={item}
            isMainColor={false}
          />
        ))}
    </div>
  );
}

export default PalleteGenColorBar;
