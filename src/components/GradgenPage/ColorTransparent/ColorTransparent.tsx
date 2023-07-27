import { activeTabContext } from "context/ActiveTabContext";
import React from "react";
import { useContext } from "react";

import "./ColorTransparent.scss";
import { Tab } from "Types/GradgenBuilderTypes";
import { PageTextContext } from "context/PageTextContext";

function ColorTransparent() {
  const { setActiveTab } = useContext(activeTabContext);

  const { data } = useContext(PageTextContext);
  function setTransparent(e: any) {
    if (e.target instanceof HTMLButtonElement) {
      setActiveTab((prev: Tab) => {
        return {
          ...prev,
          selectedColor: "transparent",
        };
      });
    }
  }

  return (
    <>
      <button
        title={data.gradientPage.transparentText}
        className="color__transparent"
        onClick={setTransparent}
      ></button>
    </>
  );
}

export default ColorTransparent;
