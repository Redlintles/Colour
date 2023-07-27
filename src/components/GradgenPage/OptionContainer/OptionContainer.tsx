import { activeTabContext } from "context/ActiveTabContext";
import { PageTextContext } from "context/PageTextContext";
import { useContext } from "react";
import LinearCanvasOptions from "../LinearCanvasOptions/LinearCanvasOptions";
import RadialCanvasOptions from "../RadialCanvasOptions/RadialCanvasOptions";
import ConicCanvasOptions from "../ConicCanvasOptions/ConicCanvasOptions";
import GradgenClipboard from "../GradgenClipboard/GradgenClipboard";

function OptionContainer() {
  const { data } = useContext(PageTextContext);
  const { activeTab } = useContext(activeTabContext);
  return (
    <div className="option-container">
      <h3 className="option-container__title">
        {data.gradientPage.optionTitle}
      </h3>
      <div className="option-container__content"></div>
      {activeTab && activeTab.type === "linear" && <LinearCanvasOptions />}
      {activeTab && activeTab.type === "radial" && <RadialCanvasOptions />}
      {activeTab && activeTab.type === "conic" && <ConicCanvasOptions />}
      <GradgenClipboard />
    </div>
  );
}

export default OptionContainer;
