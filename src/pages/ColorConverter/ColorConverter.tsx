import { useContext } from "react";

import ColorFormatBlock from "../../components/ColorConverterPage/ColorFormatBlock/ColorFormatBlock";
import ColorPicker from "../../components/ColorConverterPage/ColorPicker/ColorPicker";
import { ColorContext } from "../../context/ColorContext";
import AlphaChanger from "../../components/ColorConverterPage/AlphaChanger/AlphaChanger";

import ColorParser from "classes/ColorParser";
import { PageTextContext } from "context/PageTextContext";
import ScreenDimensionContextProvider from "../../context/ScreenDimensionContext";
import TextContent from "../../components/Frame/TextContent/TextContent";

import "./ColorConverter.scss";
function ColorConverter() {
  const { color } = useContext(ColorContext);
  const { data } = useContext(PageTextContext);

  const parser = new ColorParser(color.color);

  return (
    <div className="converter">
      <section className="converter__main">
        <h2 className="color-picker__title">{data.converterPage.title}</h2>

        <div className="converter__container">
          <ScreenDimensionContextProvider>
            <div className="main__color-picker">
              <ColorPicker />
            </div>
          </ScreenDimensionContextProvider>

          <div className="main__blocks">
            <ColorFormatBlock color={parser.rgb.toString()} type="rgb" />
            <ColorFormatBlock color={parser.hex.toString()} type="hex" />
            <ColorFormatBlock color={color.color} type="hsl" />
            <ColorFormatBlock color={parser.cmyk.toString()} type="cmyk" />
          </div>

          <AlphaChanger />
        </div>
        <p>{data.converterPage.warning}</p>
      </section>

      <TextContent data={data.converterPage.textContent} />
    </div>
  );
}

export default ColorConverter;
