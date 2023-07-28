import React, { useState, useEffect, useContext } from "react";

import { BsClipboardPlus, BsClipboardCheck } from "react-icons/bs";
import "./GradgenClipboard.scss";
import { activeTabContext } from "context/ActiveTabContext";

function GradgenClipboard() {
  const [copied, setCopied] = useState<boolean>(false);
  const { activeTab } = useContext(activeTabContext);
  const [innerText, setInnerText] = useState<any[]>();

  function formatLinear(grad: string) {
    const regex = /^(linear-gradient)(\()([^,]+,)\s(.+)(\))$/;
    const list = [];

    if (grad) {
      const match = grad.match(regex);

      if (match) {
        const colorRegex =
          /((?:#[a-fA-F0-9]{6})|(?:transparent))\s(\d+%)(?:\s(\d+%))?/g;
        const colorMatches = Array.from(match[4].matchAll(colorRegex));
        if (colorMatches && colorMatches.length > 0) {
          list.push(<span className="code-function">{match[1]}</span>);
          list.push(<span className="code-par">{match[2]}</span>);
          list.push(<span className="code-deg">{match[3]}</span>);
          for (let i of colorMatches) {
            if (i[1] !== "transparent") {
              list.push(<span style={{ color: i[1] }}>{i[1]} </span>);
            } else {
              list.push(<span style={{ color: "white" }}>transparent </span>);
            }
            list.push(<span className="code-percent">{i[2]}</span>);
            if (i[3]) {
              list.push(<span className="code-percent"> {i[3]}</span>);
            }
            if (i !== colorMatches[colorMatches.length - 1]) {
              list.push(<span>, </span>);
            }
          }
        }

        list.push(<span className="code-par">{match[5]}</span>);

        setInnerText(list);
      }
    }
  }

  function formatRadial(grad: string) {
    const regex = /^(radial-gradient)(\()([^,]+,)\s(.+)(\))$/;
    const list = [];

    if (grad) {
      const match = grad.match(regex);

      if (match) {
        const colorReg =
          /((?:#[a-fA-F0-9]{6})|(?:transparent))\s(\d+%)(?:\s(\d+%))?/g;
        const colorMatches = Array.from(match[4].matchAll(colorReg));
        if (colorMatches && colorMatches.length > 0) {
          list.push(<span className="code-function">{match[1]}</span>);
          list.push(<span className="code-par">{match[2]}</span>);
          list.push(<span className="code-deg">{match[3]}</span>);
          for (let i of colorMatches) {
            if (i[1] !== "transparent") {
              list.push(<span style={{ color: i[1] }}>{i[1]} </span>);
            } else {
              list.push(<span style={{ color: "white" }}>transparent </span>);
            }

            // list.push(<span style={{ color: i[1] }}>{i[1]} </span>);
            list.push(<span className="code-percent">{i[2]}</span>);
            if (i[3]) {
              list.push(<span className="code-percent"> {i[3]}</span>);
            }

            if (i !== colorMatches[colorMatches.length - 1]) {
              list.push(<span>, </span>);
            }
          }
          list.push(<span className="code-par">{match[5]}</span>);

          setInnerText(list);
        }
      }
    }
  }

  function formatConic(grad: string) {
    const regex = /^(conic-gradient)(\()(.+)(\))$/;
    const list = [];

    if (grad) {
      const match = grad.match(regex);
      if (match) {
        const colorReg =
          /((?:#[a-fA-F0-9]{6})|(?:transparent))(?:\s(\d+deg)\s(\d+deg))?/g;

        const colorMatches = Array.from(match[3].matchAll(colorReg));

        if (colorMatches && colorMatches.length > 0) {
          list.push(<span className="code-function">{match[1]}</span>);
          list.push(<span className="code-par">{match[2]}</span>);
          for (let i of colorMatches) {
            if (i[1] !== "transparent") {
              list.push(<span style={{ color: i[1] }}>{i[1]} </span>);
            } else {
              list.push(<span style={{ color: "white" }}>transparent </span>);
            }
            if (i[2]) {
              list.push(<span className="code-percent">{i[2]} </span>);
              list.push(<span className="code-percent">{i[3]}</span>);
            }
            if (i !== colorMatches[colorMatches.length - 1]) {
              list.push(<span>, </span>);
            }
          }
          list.push(<span className="code-par">{match[4]}</span>);
          setInnerText(list);
        }
      }
    }
  }

  useEffect(() => {
    const grad = activeTab.gradient;
    if (grad) {
      switch (activeTab.type) {
        case "linear":
          formatLinear(grad);
          break;
        case "radial":
          formatRadial(grad);
          break;
        case "conic":
          formatConic(grad);
          break;
      }
    } else {
      setInnerText([<span></span>]);
    }
  }, [activeTab]);

  function copyToClipboard() {
    if (activeTab.gradient) {
      let grad = activeTab.gradient;
      navigator.clipboard.writeText(grad + ";");
    }
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="grad-options__clipboard">
      <div>
        <p className="clipboard__text">
          {innerText &&
            innerText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
        </p>
      </div>

      <button
        className="clipboard__copy"
        onClick={copyToClipboard}
        title="Copiar CSS"
      >
        {!copied && <BsClipboardPlus />}
        {copied && <BsClipboardCheck className="copied" />}
      </button>
    </div>
  );
}

export default GradgenClipboard;
