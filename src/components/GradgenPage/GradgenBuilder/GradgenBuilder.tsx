import { useState, useEffect, useContext } from "react";
import "./GradgenBuilder.scss";

import { HiPlus } from "react-icons/hi2";
import { Tab, tabArr } from "Types/GradgenBuilderTypes";
import { v4 as uuidV4 } from "uuid";

import LinearCanvas from "../LinearCanvas/LinearCanvas";
import RadialCanvas from "../RadialCanvas/RadialCanvas";
import ConicCanvas from "../ConicCanvas/ConicCanvas";

import GradgenTab from "../GradgenTab/GradgenTab";
import AddTab from "../AddTab/AddTab";
import ColorList from "../ColorList/ColorList";
import ChangeGradType from "../ChangeGradType/ChangeGradType";
import { activeTabContext } from "context/ActiveTabContext";
import ColorTransparent from "../ColorTransparent/ColorTransparent";
import OptionContainer from "../OptionContainer/OptionContainer";
import TextContent from "../../Frame/TextContent/TextContent";
import { PageTextContext } from "context/PageTextContext";
import useLocalStorage from "hooks/useLocalStorage";

let run: boolean = true;

function GradgenBuilder() {
  const [gradientTabs, setGradientTabs] = useLocalStorage<tabArr>("tabs", [
    {
      id: uuidV4(),
      name: "Novo",
      type: "linear",
      colors: [],
      direction: 20,
      selectedColor: "#ffffff",
    },
  ]);
  const { activeTab, setActiveTab } = useContext(activeTabContext);
  const [addTab, setAddTab] = useState<Boolean>(false);

  const { data } = useContext(PageTextContext);

  useEffect(() => {
    if (activeTab) {
      const map = gradientTabs.map((item) => {
        if (item.id === activeTab.id) {
          return activeTab;
        } else {
          return item;
        }
      });
      setGradientTabs(map);
    }
  }, [activeTab]);

  useEffect(() => {
    if (gradientTabs && gradientTabs.length && run) {
      setActiveTab(gradientTabs[0]);
      run = false;
    }
  }, [gradientTabs]);

  useEffect(() => {
    document.addEventListener("click", function (e: any) {
      const colorList = document.querySelectorAll(".color-list__item");

      if (e.target.matches(".color__transparent") && colorList) {
        e.target.classList.toggle("active");

        colorList.forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }, []);

  return (
    <>
      <section className="gradgen">
        <header className="gradgen__tab-container">
          {gradientTabs &&
            gradientTabs.length !== 0 &&
            gradientTabs.map((item: Tab) => (
              <GradgenTab
                item={item}
                isActive={item.id === activeTab.id}
                addTab={addTab}
                setAddTab={setAddTab}
                setGradientTabs={setGradientTabs}
                key={item.id}
              ></GradgenTab>
            ))}
          <button
            className={`add-btn ${addTab ? "active" : ""}`}
            onClick={() => {
              setAddTab(true);
            }}
          >
            <HiPlus></HiPlus>
          </button>
        </header>
        {activeTab && !addTab && (
          <main className="gradgen__main-container">
            <div className="main-container__color-list">
              <ColorList changer={true} />
              <ColorTransparent />
            </div>

            <div>
              <ChangeGradType />
              <div className="main-option-container">
                <OptionContainer />
              </div>
            </div>

            <div className="md-lg-option-container">
              <OptionContainer />
            </div>

            <div className="main-container__grad-creator">
              <h3>{data.gradientPage.canvasCallToAction}</h3>
              {activeTab && activeTab.type === "linear" && <LinearCanvas />}
              {activeTab && activeTab.type === "radial" && <RadialCanvas />}
              {activeTab && activeTab.type === "conic" && <ConicCanvas />}
            </div>
          </main>
        )}
        {addTab && (
          <AddTab
            setGradientTabs={setGradientTabs}
            gradientTabs={gradientTabs}
            toggler={setAddTab}
          />
        )}
      </section>
      <TextContent data={data.gradientPage.textContent} />
    </>
  );
}

export default GradgenBuilder;
