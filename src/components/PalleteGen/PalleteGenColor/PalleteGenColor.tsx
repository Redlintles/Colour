import "./PalleteGenColor.scss";
import { useState, useContext, useEffect, ChangeEvent } from "react";
import { ColorCoord, palleteGenContext } from "context/PalleteGenContext";
import { useColorValidator } from "hooks/useColorValidator";
import {
  ColorBarContext,
  ColorBarContextSchema,
} from "../../../context/ColorBarContext";
import { v4 as uuidV4 } from "uuid";
import PalletePoints from "classes/PalletePoints";
import ColorParser, { HEXColor } from "classes/ColorParser";

type Props = {
  initialColor: ColorCoord;
  isMainColor: boolean;
};

interface ColorComponents {
  red: number;
  green: number;
  blue: number;
}

function PalleteGenColor({ initialColor, isMainColor }: Props) {
  const { colorBarData, setColorBarData } = useContext(ColorBarContext);
  const { pallete } = useContext(palleteGenContext);
  const [colorComponents, setColorComponents] = useState<ColorComponents>({
    red: 255,
    green: 0,
    blue: 0,
  });

  const [color, setColor] = useState<string>(initialColor.color);
  const [inputColor, setInputColor] = useState<string>(initialColor.color);

  const { validateHEX } = useColorValidator();

  function changeComponent(e: ChangeEvent) {
    const { target: input } = e;
    if (input instanceof HTMLInputElement) {
      const value = parseInt(input.value);
      let obj: ColorComponents = Object.assign({}, colorComponents);

      switch (input.name) {
        case "red":
          obj = {
            ...colorComponents,
            red: value,
          };
          break;
        case "green":
          obj = {
            ...colorComponents,
            green: value,
          };

          break;
        case "blue":
          obj = {
            ...colorComponents,
            blue: value,
          };

          break;
      }
      const { red, green, blue } = obj;
      const hex = new HEXColor(red, green, blue).toString();
      if (hex !== color) {
        setColor(hex);
        setInputColor(hex);
        setColorComponents(obj);
      }
    }
  }

  function changeMainColor() {
    if (
      !isMainColor &&
      colorBarData.mainColor.color !== color &&
      pallete.canvasOBJ
    ) {
      const { hue, saturation, lightness } = new ColorParser(color).hsl;
      const coord = PalletePoints.findColorPoint(
        hue,
        pallete.saturationGrad ? saturation : lightness,
        pallete.canvasOBJ.center
      );
      setColorBarData((prev: ColorBarContextSchema): ColorBarContextSchema => {
        return {
          ...prev,
          mainColor: {
            id: uuidV4(),
            color,
            coord,
          },
          modifiedBy: "color",
        };
      });
    }
  }

  function changeInputColor(e: ChangeEvent) {
    const { target: input } = e;
    if (input instanceof HTMLInputElement) {
      const { value } = input;

      if (validateHEX(value) && value !== color) {
        setColor(value);
        const { red, green, blue } = ColorParser.splitHEX(value);

        setColorComponents({ red, green, blue });
      }
      setInputColor(value);
    }
  }

  useEffect(() => {
    const { red, green, blue } = ColorParser.splitHEX(initialColor.color);
    setColor(initialColor.color);
    setInputColor(initialColor.color);
    setColorComponents({ red, green, blue });
  }, [initialColor]);

  useEffect(() => {
    if (
      isMainColor &&
      color !== initialColor.color &&
      colorBarData.modifiedBy !== "color" &&
      pallete.canvasOBJ
    ) {
      const { hue, saturation, lightness } = new ColorParser(color).hsl;

      const coord = PalletePoints.findColorPoint(
        hue,
        pallete.saturationGrad ? saturation : lightness,
        pallete.canvasOBJ.center
      );
      setColorBarData((prev: ColorBarContextSchema): ColorBarContextSchema => {
        return {
          ...prev,
          mainColor: {
            id: uuidV4(),
            color,
            coord,
          },
          modifiedBy: "color",
        };
      });
    }
    /* eslint-disable */
  }, [color]);
  /* eslint-enable */

  return (
    <article className="pallete-gen-color">
      <div className="color__left">
        <div
          className="color__preview"
          style={{
            backgroundColor: validateHEX(color) ? color : "#ff0000",
          }}
          onClick={() => changeMainColor()}
        ></div>
        <input type="text" value={inputColor} onChange={changeInputColor} />
      </div>

      <div className="color__component-sliders">
        <div className="component-slider">
          <span className="component-slider__text">R:</span>
          <input
            className="component-slider__input"
            type="range"
            min="0"
            max="255"
            value={colorComponents.red}
            name="red"
            onChange={changeComponent}
          />
          <span className="component-slider__text">
            {colorComponents.red.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="component-slider">
          <span className="component-slider__text">G:</span>
          <input
            className="component-slider__input"
            type="range"
            min="0"
            max="255"
            value={colorComponents.green}
            name="green"
            onChange={changeComponent}
          />
          <span className="component-slider__text">
            {colorComponents.green.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="component-slider">
          <span className="component-slider__text">B:</span>
          <input
            className="component-slider__input"
            type="range"
            min="0"
            max="255"
            value={colorComponents.blue}
            name="blue"
            onChange={changeComponent}
          />
          <span className="component-slider__text">
            {colorComponents.blue.toString().padStart(3, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PalleteGenColor;
