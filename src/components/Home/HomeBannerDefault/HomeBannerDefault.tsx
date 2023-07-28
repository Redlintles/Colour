import { PageTextContext } from "context/PageTextContext";
import React, { useContext } from "react";

function HomeBannerDefault() {
  const { data } = useContext(PageTextContext);
  return (
    <div className="home-banner__banner">
      <div className="banner__left">
        <h3>{data.home.bannerDefault.title}</h3>
        <p>{data.home.bannerDefault.txt1}</p>
        <p>{data.home.bannerDefault.txt2}</p>
      </div>
    </div>
  );
}

export default HomeBannerDefault;
