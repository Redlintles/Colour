import React from "react";
import "./Header.scss";

import { Link, NavLink } from "react-router-dom";
import { useContext, ChangeEvent, useState } from "react";
import { PageTextContext } from "context/PageTextContext";
import { dataEN, dataPT } from "data/PageText";
import NavResponsiveSelect from "../NavResponsiveSelect/NavResponsiveSelect";
import { GiHamburgerMenu } from "react-icons/gi";
import { supportedLanguages } from "data/SupportedLanguages";
import { Language } from "../../../data/SupportedLanguages";

function Header() {
  const { data, setData } = useContext(PageTextContext);
  const [showNav, setShowNav] = useState<boolean>(false);

  function changeLanguage(e: ChangeEvent) {
    const { target: select } = e;
    if (select instanceof HTMLSelectElement) {
      switch (select.value) {
        case "EN":
          setData(dataEN);
          break;
        case "PT":
          setData(dataPT);
      }
    }
  }

  return (
    <header className="nav">
      <div className="nav__brand">
        <Link to="/Colour/">
          <h1>Colour</h1>
        </Link>
      </div>
      <div className="nav__container">
        <nav className="nav__links">
          <NavLink to="/Colour/converter">{data.routes[0]}</NavLink>
          <NavLink to="/Colour/gradgen">{data.routes[1]}</NavLink>
          <NavLink to="/Colour/palleteGen">{data.routes[2]}</NavLink>
        </nav>

        <select
          name=""
          id=""
          onChange={changeLanguage}
          className="nav__select"
          defaultValue={"PT"}
        >
          {supportedLanguages.map((item: Language) => (
            <option value={item.acronym} key={item.acronym}>
              {item.language}
            </option>
          ))}
        </select>
      </div>

      <div className="nav-responsive">
        <button
          className="nav-responsive__toggler"
          onClick={() => setShowNav(!showNav)}
        >
          <GiHamburgerMenu />
        </button>
        <div className={`nav-responsive__container${showNav ? " show" : ""}`}>
          <nav
            className="nav-responsive__links"
            onClick={() => setShowNav(!showNav)}
          >
            <NavLink onClick={() => setShowNav(false)} to="/Colour/converter">
              {data.routes[0]}
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} to="/Colour/gradgen">
              {data.routes[1]}
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} to="/Colour/palleteGen">
              {data.routes[2]}
            </NavLink>
          </nav>

          <NavResponsiveSelect />
        </div>
      </div>
    </header>
  );
}

export default Header;
