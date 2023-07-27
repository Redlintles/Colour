import { useContext } from "react";
import "./Loading.scss";
import { PageTextContext } from "context/PageTextContext";

function Loading() {
  const { data } = useContext(PageTextContext);
  return (
    <div className="loading">
      <div className="loading__upper">
        <div className="loading__banner">
          <img src="/colour_logo.png" alt="" />
        </div>
      </div>

      <div className="loading__bottom">
        <span className="loading__jumper" id="jumper-1"></span>
        <span className="loading__jumper" id="jumper-2"></span>
        <span className="loading__jumper" id="jumper-3"></span>
      </div>
      <p className="loading__text">{data.loading}</p>
    </div>
  );
}

export default Loading;
