import { ColorBarContext } from "context/ColorBarContext";
import React, { useContext } from "react";
import CopyBtn from "../../Frame/CopyBtn/CopyBtn";

import "./PalleteColorList.scss";

function PalleteColorList() {
  const { colorBarData } = useContext(ColorBarContext);

  return (
    <div className="pallete-color-list">
      <div className="pallete-color-list__list">
        <div className="pallete-color-list__color">
          <div>
            <div
              className="preview"
              style={{ backgroundColor: colorBarData.mainColor.color }}
            ></div>
            <span>{colorBarData.mainColor.color}</span>
          </div>
          <CopyBtn value={colorBarData.mainColor.color} />
        </div>
        {colorBarData.secondaryColors &&
          colorBarData.secondaryColors.length &&
          colorBarData.secondaryColors.map(({ color }) => (
            <div className="pallete-color-list__color" key={color}>
              <div>
                <div
                  className="preview"
                  style={{ backgroundColor: color }}
                ></div>
                <span>{color}</span>
              </div>
              <CopyBtn value={color} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PalleteColorList;
