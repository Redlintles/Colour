import { PageTextContext } from "context/PageTextContext";
import React, { useContext } from "react";

function HomeBanner1() {
  const { data } = useContext(PageTextContext);
  return (
    <div className="home-banner__banner">
      <div className="banner__left">
        <h3>{data.home.banner1.title}</h3>
        <p>{data.home.banner1.txt1}</p>
        <p>{data.home.banner1.txt2}</p>
      </div>
      <div className="banner__right"></div>
    </div>
  );
}

export default HomeBanner1;
