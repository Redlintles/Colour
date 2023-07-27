import React, { useContext, useState, useEffect } from "react";

import { HiXMark, HiCheck } from "react-icons/hi2";
import { Tab } from "Types/GradgenBuilderTypes";
import "./ColorList.scss";
import { activeTabContext } from "context/ActiveTabContext";
import { PageTextContext } from "../../../context/PageTextContext";

type Props = {
  tab?: Tab;
  setTab?: any;
  changer: boolean;
};

function ColorList({ tab, setTab, changer }: Props) {
  const { activeTab, setActiveTab } = useContext(activeTabContext);
  const [colors, setColors] = useState<string[]>(
    tab?.colors ? tab.colors : activeTab.colors
  );
  const { data } = useContext(PageTextContext);
  function addColor(e: any): void {
    const setter = setTab ? setTab : setActiveTab;
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      e.stopPropagation();
      const input = e.target.querySelector("input[type='color']");
      const callback = (prev: Tab) => {
        if (prev.colors.length) {
          return {
            ...prev,
            colors: [...colors, input.value],
          };
        }
        return {
          ...prev,
          colors: [...colors, input.value],
          selectedColor: input.value,
        };
      };
      if (input instanceof HTMLInputElement) {
        setter(callback);
      }
    }
  }

  function deleteColor(item: string) {
    if (activeTab || tab) {
      return (e: any) => {
        e.preventDefault();
        const filter = colors.filter((color) => item !== color);
        const callback = (prev: any) => {
          return {
            ...prev,
            colors: filter,
          };
        };
        tab && setTab ? setTab(callback) : setActiveTab(callback);
      };
    }
    return () => {};
  }

  function changeColor(item: string) {
    if (changer) {
      const transparent = document.querySelector(".color__transparent");
      return (e: any) => {
        if (transparent) {
          transparent.classList.remove("active");
        }
        const li = e.target;
        if (li instanceof HTMLLIElement) {
          const parent = li.parentElement;
          if (parent) {
            const children = Array.from(parent.children);

            children.forEach((item) => {
              item.classList.remove("active");
            });
          }
          li.classList.toggle("active");
          if (li.classList.contains("active")) {
            setActiveTab((prev: any) => {
              return {
                ...prev,
                selectedColor: item,
              };
            });
          } else {
            setActiveTab((prev: any) => {
              return {
                ...prev,
                selectedColor: "#ffffff",
              };
            });
          }
        }
      };
    } else {
      return () => {};
    }
  }

  function clearColorList(): void {
    const setter = tab && setTab ? setTab : setActiveTab;
    setter((prev: Tab) => {
      return {
        ...prev,
        colors: [],
      };
    });
  }

  useEffect(() => {
    if (tab) {
      setColors(tab.colors);
    } else {
      setColors(activeTab.colors);
    }
  }, [tab, activeTab]);
  return (
    <div className="color-list">
      <h3>{data.gradientPage.colorListTitle}</h3>
      <ul className="color-list__list">
        {colors &&
          colors.length > 0 &&
          colors.map((item, i) => (
            <li
              key={i}
              className={`color-list__item${
                i === 0 && changer ? " active" : ""
              }`}
              onClick={changeColor(item)}
              onContextMenu={deleteColor(item)}
              title={item}
            >
              <div
                className="color-list__color"
                style={{ backgroundColor: item }}
              ></div>
            </li>
          ))}

        {activeTab && colors.length === 0 && (
          <p>{data.gradientPage.colorListAddText}</p>
        )}
      </ul>

      <form
        onSubmit={addColor}
        className="color-list__form"
        id="color-list-form"
      >
        <button
          type="button"
          className="color-list__clear"
          onClick={clearColorList}
        >
          <HiXMark />
        </button>
        <input type="color" placeholder="Adicionar Nova Cor" />

        <button type="submit" form="color-list-form">
          <HiCheck />
        </button>
      </form>
    </div>
  );
}

export default ColorList;
