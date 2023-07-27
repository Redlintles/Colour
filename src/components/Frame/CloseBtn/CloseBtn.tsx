import React from "react";

import "./CloseBtn.scss";

type Props = {
  toggler: Function;
};

function CloseBtn({ toggler }: Props) {
  return (
    <button className="close-btn" onClick={() => toggler(false)}>
      X
    </button>
  );
}

export default CloseBtn;
