import React, { useContext, useEffect } from "react";
import "./PalleteGen.scss";
import PalleteGenPicker from "components/PalleteGen/PalleteGenPicker/PalleteGenPicker";
import PalleteGenStyle from "components/PalleteGen/PalleteGenStyle/PalleteGenStyle";
import PalleteGenColorBar from "components/PalleteGen/PalleteGenColorBar/PalleteGenColorBar";
import { PalleteGenContextProvider } from "context/PalleteGenContext";
import {
  ColorBarContext,
  ColorBarContextSchema,
} from "context/ColorBarContext";
import { PageTextContext } from "context/PageTextContext";
import TextContent from "../../components/Frame/TextContent/TextContent";
import useLocalStorage from "hooks/useLocalStorage";

function PalleteGen() {
  const { data } = useContext(PageTextContext);
  const { colorBarData, setColorBarData } = useContext(ColorBarContext);
  const [storedColorBar, setStoredColorBar] =
    useLocalStorage<ColorBarContextSchema>("pallete-color-bar", colorBarData);

  useEffect(() => {
    if (storedColorBar !== colorBarData) {
      setColorBarData({
        ...storedColorBar,
        modifiedBy: "storage",
      });
    }
  }, [storedColorBar]);

  useEffect(() => {
    if (colorBarData.modifiedBy !== "storage") {
      setStoredColorBar(colorBarData);
    }
  }, [colorBarData]);

  return (
    <>
      <section className="pallete-gen">
        <h2>{data.palletePage.title}</h2>
        <div className="pallete-gen__container">
          <PalleteGenContextProvider>
            <div className="pallete-gen__color-picker">
              <PalleteGenPicker />
            </div>
            <div className="pallete-gen__pallete-style">
              <PalleteGenStyle />
            </div>
            <div className="pallete-gen__color-bar">
              <PalleteGenColorBar />
            </div>
          </PalleteGenContextProvider>
        </div>
      </section>
      <TextContent data={data.palletePage.textContent} />
    </>
  );
}

export default PalleteGen;
