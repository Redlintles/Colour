import { PageTextContext } from "context/PageTextContext";
import { useContext } from "react";

function HomeBanner3() {
  const { data } = useContext(PageTextContext);
  return (
    <div className="home-banner__banner">
      <h3>{data.home.banner3.title}</h3>
      <p>{data.home.banner3.txt1}</p>
      <p>{data.home.banner3.txt2}</p>
    </div>
  );
}

export default HomeBanner3;
