import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Tab } from "Types/GradgenBuilderTypes";
import { activeTabContext } from "context/ActiveTabContext";

import "./ChangeGradType.scss";
import { PageTextContext } from "context/PageTextContext";

type Props = {
  tab?: Tab;
  setTab?: Function;
};

interface GradType {
  type: string;
  modifiedBy: "tab" | "changer" | "";
}

function ChangeGradType({ tab, setTab }: Props) {
  const { activeTab, setActiveTab } = useContext(activeTabContext);

  const { data } = useContext(PageTextContext);
  const [type, setType] = useState<GradType>({
    type: tab?.type || activeTab.type,
    modifiedBy: "",
  });

  function gradTypeChanger(e: ChangeEvent) {
    const { target: input } = e;
    if (input instanceof HTMLInputElement) {
      const { value } = input;

      setType({
        type: value,
        modifiedBy: "changer",
      });
    }
  }

  useEffect(() => {
    if (type.modifiedBy !== "changer") {
      return;
    }
    const callback = (prev: Tab) => {
      switch (type.type) {
        case "linear":
          return {
            ...prev,
            colors: [],
            type: type.type,
            percents: [],
            gradient: "",
            stops: true,
            direction: 90,
            shapeArr: [],
            selectedColor: "#ffffff",
          };
        case "radial":
          return {
            ...prev,
            colors: [],
            type: type.type,
            percents: [],
            gradient: "",
            stops: true,
            shapeArr: [],

            center: [50, 50],
            selectedColor: "#ffffff",
          };
        case "conic":
          return {
            ...prev,
            colors: [],
            type: type.type,
            percents: [],
            gradient: "",
            stops: true,
            shapeArr: [],
            direction: 90,
            selectedColor: "#ffffff",
          };
      }

      return {
        ...prev,
        colors: [],
        type: type.type,
        shapeArr: [],
        percents: [],
        gradient: "",
      };
    };
    if (tab && setTab) {
      setTab(callback);
    } else {
      setActiveTab(callback);
    }
  }, [type]);

  useEffect(() => {
    setType({
      type: activeTab.type,
      modifiedBy: "tab",
    });
  }, [activeTab]);

  return (
    <div className="grad-type">
      <h3>{data.gradientPage.gradientTypeTitle}</h3>
      <div>
        <label>
          <input
            type="radio"
            name="grad-type"
            className="grad-type__radio"
            value="linear"
            onChange={gradTypeChanger}
            checked={type.type === "linear" ? true : false}
          />
          <span>{data.gradientPage.gradientTypes[0]}</span>
        </label>
        <label>
          <input
            type="radio"
            name="grad-type"
            className="grad-type__radio"
            value="radial"
            onChange={gradTypeChanger}
            checked={type.type === "radial" ? true : false}
          />
          <span>{data.gradientPage.gradientTypes[1]}</span>
        </label>
        <label>
          <input
            type="radio"
            name="grad-type"
            className="grad-type__radio"
            value="conic"
            onChange={gradTypeChanger}
            checked={type.type === "conic" ? true : false}
          />
          <span>{data.gradientPage.gradientTypes[2]}</span>
        </label>
      </div>
    </div>
  );
}

export default ChangeGradType;
