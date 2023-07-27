import { Tab, tabArr } from "Types/GradgenBuilderTypes";

import "./GradgenTab.scss";
import { activeTabContext, defaultValue } from "context/ActiveTabContext";
import { useContext, useState } from "react";

type Props = {
  item: Tab;
  isActive: Boolean;
  addTab: Boolean;
  setAddTab: Function;
  setGradientTabs: Function;
};

const nameLengthActive = 7;
const nameLengthInnactive = 10;

function GradgenTab({
  item,
  isActive,
  addTab,
  setAddTab,
  setGradientTabs,
}: Props) {
  const { setActiveTab } = useContext(activeTabContext);
  const [hovering, setHovering] = useState<boolean>(false);

  function tabDeleter(id: string) {
    setGradientTabs((prev: tabArr) => {
      if (prev.length > 1) {
        let copy = [...prev];
        let item = copy[0];
        for (let i of copy) {
          if (i.id === id) {
            item = copy[copy.indexOf(i) - 1];
          }
        }
        copy = copy.filter((item) => {
          return item.id !== id;
        });

        setActiveTab(copy.length === 1 ? copy[0] : item);

        return copy;
      } else {
        return [defaultValue];
      }
    });
  }
  return (
    <div
      className={`tab-container__tab${isActive && !addTab ? " active" : ""}`}
      key={item.id}
      onClick={() => {
        setActiveTab(item);
        setAddTab(false);
      }}
    >
      <p>
        {item.name.length <= nameLengthActive
          ? item.name
          : `${item.name.slice(0, nameLengthActive - 3)}...`}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          tabDeleter(item.id);
        }}
        onMouseOver={(e) => e.stopPropagation()}
      >
        X
      </button>
    </div>
  );
}

export default GradgenTab;
