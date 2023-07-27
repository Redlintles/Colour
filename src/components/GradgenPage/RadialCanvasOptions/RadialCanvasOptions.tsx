import React, { useContext } from "react";
import { activeTabContext } from "context/ActiveTabContext";
import { ChangeEvent } from "react";
import { Tab } from "Types/GradgenBuilderTypes";
import ChangeColorStops from "../ChangeColorStops/ChangeColorStops";
import { useUtils } from "hooks/useUtils";

import "./RadialCanvasOptions.scss";
import { PageTextContext } from "context/PageTextContext";

function RadialCanvasOptions() {
  const { activeTab, setActiveTab } = useContext(activeTabContext);

  const { center } = activeTab;

  const { data } = useContext(PageTextContext);

  const { clamp } = useUtils();

  function changeListener(yChanger: boolean) {
    return (e: ChangeEvent) => {
      if (e.target instanceof HTMLInputElement) {
        let value = parseInt(e.target.value) || 0;
        value = clamp(value, 0, 100);

        setActiveTab((prev: Tab) => {
          const [x, y] = prev.center ?? [50, 50];
          return {
            ...prev,
            center: yChanger ? [x, value] : [value, y],
          };
        });
      }
    };
  }
  return (
    <div>
      <div className="options__center">
        <span>{data.gradientPage.centerText}</span>
        <label htmlFor="" className="center__label">
          <span>X:</span>
          <input
            type="number"
            min="0"
            max="100"
            value={center ? center[0] : 50}
            onChange={changeListener(false)}
          />
          <span>%</span>
        </label>
        <label htmlFor="" className="center__label">
          <span>Y:</span>
          <input
            type="number"
            min="0"
            max="100"
            value={center ? center[1] : 50}
            onChange={changeListener(true)}
          />
          <span>%</span>
        </label>
      </div>
      <ChangeColorStops />
    </div>
  );
}

export default RadialCanvasOptions;
