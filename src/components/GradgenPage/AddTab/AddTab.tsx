import React, { useState, useEffect, useContext } from "react";
import { Tab, tabArr } from "Types/GradgenBuilderTypes";
import { v4 as uuidV4 } from "uuid";
import ColorList from "../ColorList/ColorList";
import ChangeGradType from "../ChangeGradType/ChangeGradType";

import "./AddTab.scss";
import { activeTabContext } from "context/ActiveTabContext";
import { PageTextContext } from "context/PageTextContext";

type Props = {
  setGradientTabs: Function;
  gradientTabs: tabArr;
  toggler: Function;
};

let createdNewTab: boolean = false;

function AddTab({ setGradientTabs, gradientTabs, toggler }: Props) {
  const [newTab, setNewTab] = useState<Tab>({
    name: "New Tab",
    id: uuidV4(),
    colors: [],
    shapeArr: [],
    type: "linear",
    selectedColor: "#ffffff",
  });

  const { setActiveTab } = useContext(activeTabContext);
  const { data } = useContext(PageTextContext);

  function addTab() {
    createdNewTab = true;
    console.log(newTab);
    setGradientTabs((prev: tabArr) => {
      return [...prev, newTab];
    });
    setActiveTab(newTab);
  }

  useEffect(() => {
    if (createdNewTab) {
      createdNewTab = false;
      toggler(false);
      setActiveTab(gradientTabs.slice(-1)[0]);
    }
  }, [gradientTabs, setActiveTab, toggler]);

  useEffect(() => {
    console.log(newTab);
  }, [newTab]);
  return (
    <>
      <div className="add-tab">
        <h3>{data.gradientPage.addTabText.title}</h3>
        <label className="add-tab__name">
          <span>{data.gradientPage.addTabText.name}</span>
          <input
            type="text"
            name=""
            id=""
            placeholder={data.gradientPage.addTabText.namePlaceholder}
            onChange={(e) => {
              console.log(e.target.value !== "", e.target.value);
              setNewTab((prev: Tab) => {
                return {
                  ...prev,
                  name: e.target.value ? e.target.value : "New Tab",
                };
              });
            }}
          />
        </label>
        <ChangeGradType tab={newTab} setTab={setNewTab} />
        <ColorList tab={newTab} setTab={setNewTab} changer={false} />
        <button onClick={addTab} className="add-tab__add">
          {data.gradientPage.addTabText.submit}
        </button>
      </div>
    </>
  );
}

export default AddTab;
