import { PageTextContext } from "context/PageTextContext";
import { useContext, useState, useEffect } from "react";

import { AiFillCaretDown } from "react-icons/ai";
import "./NavResponsiveSelect.scss";
import { Language, supportedLanguages } from "../../../data/SupportedLanguages";

type optionProps = {
  data: Language;
  setLanguage: Function;
  active: boolean;
};

function NavSelectOption({ data, setLanguage, active }: optionProps) {
  return (
    <div
      className={`nav-responsive__option${active ? " active" : ""}`}
      onClick={() => setLanguage(data)}
    >
      <span>{data.language}</span>
    </div>
  );
}

function NavResponsiveSelect() {
  const [language, setLanguage] = useState<Language>(supportedLanguages[0]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { data, setData } = useContext(PageTextContext);
  function selectManager() {
    if (data !== language.data) {
      setData(language.data);
    }
  }

  useEffect(
    selectManager,
    /* eslint-disable */
    [language]
    /* eslint-enable */
  );
  return (
    <div className="nav-select" onClick={() => setShowOptions(!showOptions)}>
      <div className="nav-select__top">
        <p className="nav-select__label">{language.language}</p>
        <span
          className={`nav-select__arrow${showOptions && " arrow--rotate-up"}`}
        >
          <AiFillCaretDown />
        </span>
      </div>
      <div
        className={`nav-select__options${showOptions ? " show-options" : ""}`}
      >
        {supportedLanguages.map((dataItem) => (
          <NavSelectOption
            data={dataItem}
            setLanguage={setLanguage}
            active={dataItem.data === language.data}
            key={dataItem.acronym}
          />
        ))}
      </div>
    </div>
  );
}

export default NavResponsiveSelect;
