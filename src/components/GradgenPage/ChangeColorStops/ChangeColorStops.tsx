import React, { useContext } from "react";
import { activeTabContext } from "context/ActiveTabContext";
import { Tab } from "Types/GradgenBuilderTypes";

import "./ChangeColorStops.scss";
import { PageTextContext } from "context/PageTextContext";

function ChangeColorStops() {
  const { activeTab, setActiveTab } = useContext(activeTabContext);
  const { data } = useContext(PageTextContext);
  return (
    <label className="options__trans-label">
      <span>{data.gradientPage.stopsText}</span>
      <input
        type="checkbox"
        onChange={(e) => {
          setActiveTab((prev: Tab) => {
            return {
              ...prev,
              stops: e.target.checked,
            };
          });
        }}
        checked={activeTab.stops ? true : false}
      />
    </label>
  );
}

export default ChangeColorStops;
