import { ColorBarContext } from "context/ColorBarContext";
import React, { useContext } from "react";

import "./PalleteCSSCode.scss";

// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyBtn from "../../Frame/CopyBtn/CopyBtn";

function PalleteCSSCode() {
  const { colorBarData: data } = useContext(ColorBarContext);

  function otherColors() {
    let list = data.secondaryColors.map(({ color }, index) => {
      return `\t--color-${index + 2}: ${color};${index < 3 ? "\n" : ""}`;
    });
    return list.join("");
  }

  const markdown = `:root {\n\t--main-color: ${
    data.mainColor.color
  };\n${otherColors()}\n}
  `;
  return (
    <div className="pallete-css-code">
      <CopyBtn value={markdown} />
      <SyntaxHighlighter
        language="css"
        style={dark}
        PreTag="div"
        children={markdown}
      />
    </div>
  );
}

export default PalleteCSSCode;
