import HomeBanner1 from "components/Home/HomeBanner1/HomeBanner1";
import HomeBanner2 from "components/Home/HomeBanner2/HomeBanner2";
import HomeBanner3 from "components/Home/HomeBanner3/HomeBanner3";
import HomeBannerDefault from "components/Home/HomeBannerDefault/HomeBannerDefault";
import React, { useRef, useState, useContext } from "react";

import { Link } from "react-router-dom";

import "./Home.scss";
import { PageTextContext } from "context/PageTextContext";

type bannerClassNames = "default" | "converter" | "gradgen" | "palletegen";

function Home() {
  const HomeBanner = useRef<HTMLDivElement>(null);

  const [bannerClass, setBannerClass] = useState<bannerClassNames>("default");

  const { data } = useContext(PageTextContext);

  function bannerClassManager(className: bannerClassNames = "default") {
    const { current: banner } = HomeBanner;
    if (banner instanceof HTMLDivElement) {
      className !== "converter"
        ? banner.classList.remove("converter")
        : banner.classList.add("converter");
      className !== "gradgen"
        ? banner.classList.remove("gradgen")
        : banner.classList.add("gradgen");
      className !== "palletegen"
        ? banner.classList.remove("palletegen")
        : banner.classList.add("palletegen");
      className !== "default"
        ? banner.classList.remove("default")
        : banner.classList.add("default");

      setBannerClass(className);
    }
  }

  return (
    <div className="home">
      <div className="home-banner default" ref={HomeBanner}>
        {bannerClass === "default" && <HomeBannerDefault />}
        {bannerClass === "converter" && <HomeBanner1 />}
        {bannerClass === "gradgen" && <HomeBanner2 />}
        {bannerClass === "palletegen" && <HomeBanner3 />}
        <nav className="home-nav">
          <div
            className="home-link"
            onFocus={() => bannerClassManager("converter")}
            onBlur={() => bannerClassManager("default")}
            onMouseOver={() => bannerClassManager("converter")}
            onMouseOut={() => bannerClassManager("default")}
          >
            <Link className="home-link__link" to="/Colour/converter">
              {data.converterPage.title}
            </Link>
          </div>
          <div
            className="home-link"
            onFocus={() => bannerClassManager("gradgen")}
            onBlur={() => bannerClassManager("default")}
            onMouseOver={() => bannerClassManager("gradgen")}
            onMouseOut={() => bannerClassManager("default")}
          >
            <div className="home-link__squares">
              <div className="home-link__grad"></div>
              <div className="home-link__grad"></div>
              <div className="home-link__grad"></div>
            </div>
            <Link className="home-link__link" to="/Colour/gradgen">
              {data.routes[1]}
            </Link>
          </div>
          <div
            className="home-link"
            onFocus={() => bannerClassManager("palletegen")}
            onBlur={() => bannerClassManager("default")}
            onMouseOver={() => bannerClassManager("palletegen")}
            onMouseOut={() => bannerClassManager("default")}
          >
            <Link className="home-link__link" to="/Colour/palletegen">
              {data.palletePage.title}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Home;
