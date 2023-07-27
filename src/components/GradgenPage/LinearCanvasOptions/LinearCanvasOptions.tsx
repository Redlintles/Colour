import { useContext } from "react";
import { BsArrowUp } from "react-icons/bs";

import "./LinearCanvasOptions.scss";
import { activeTabContext } from "context/ActiveTabContext";
import ChangeColorStops from "../ChangeColorStops/ChangeColorStops";
import { PageTextContext } from "context/PageTextContext";

function LinearCanvasOptions() {
  const { activeTab, setActiveTab } = useContext(activeTabContext);
  const { data } = useContext(PageTextContext);
  return (
    <div>
      <label className="options__direction-label">
        <span>{data.gradientPage.directionText[0]}</span>
        <input
          type="number"
          value={activeTab.direction || ""}
          min={0}
          max={360}
          onChange={(e) => {
            setActiveTab((prev: any) => {
              return {
                ...prev,
                direction: parseInt(e.target.value),
              };
            });
          }}
        />
        <span>{data.gradientPage.directionText[1]}(°)</span>
        <div>
          <BsArrowUp
            style={{
              transform: `rotate(${activeTab.direction || 90}deg)`,
            }}
          />
        </div>
      </label>
      <ChangeColorStops />
    </div>
  );
}

export default LinearCanvasOptions;
