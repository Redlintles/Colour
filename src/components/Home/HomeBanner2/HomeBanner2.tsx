import { PageTextContext } from "context/PageTextContext";
import { useContext } from "react";

function HomeBanner2() {
  const { data } = useContext(PageTextContext);
  return (
    <div className="home-banner__banner">
      <h3> {data.home.banner2.title}</h3>
      <p>{data.home.banner2.txt1}</p>
      <p>{data.home.banner2.txt2}</p>
    </div>
  );
}

export default HomeBanner2;
