import { ColorContext } from "context/ColorContext";

import {
  useContext,
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";

import "./AlphaChanger.scss";
import { useUtils } from "hooks/useUtils";
import ColorParser from "classes/ColorParser";
import { PageTextContext } from "context/PageTextContext";

function AlphaChanger() {
  const { color, setColor } = useContext(ColorContext);
  const { clamp } = useUtils();
  const [alpha, setAlpha] = useState<string>("1");
  const [alphaColor, setAlphaColor] = useState<string>(color.color);

  const { data } = useContext(PageTextContext);

  const formatAlpha = useCallback(
    (e: ChangeEvent) => {
      const { target: input } = e;
      if (input instanceof HTMLInputElement) {
        const { value: alpha } = input;
        let a = clamp(parseFloat(alpha), 0, 1);

        a = isNaN(a) ? 0 : a;

        const parser = new ColorParser(color.color);
        let formatted = parser.hsl;

        formatted.alpha = a;

        setColor({
          color: formatted.toString(),
          modifiedBy: "alpha",
        });
        setAlpha(alpha);
        setAlphaColor(formatted.toString());
      }
    },
    /* eslint-disable */
    [color]
    /* eslint-enable */
  );

  useEffect(() => {
    if (color.modifiedBy !== "alpha") {
      setAlphaColor(color.color);
    }
  }, [color]);

  return (
    <div className="alpha-changer">
      <div className="alpha-changer__preview">
        <p>{data.converterPage.alphaText}</p>
        <div
          className="color-preview"
          style={{ backgroundColor: alphaColor }}
        ></div>
      </div>
      <input
        type="number"
        value={alpha}
        onChange={formatAlpha}
        placeholder="Alpha..."
        className="alpha-changer__input"
        min={0}
        max={1}
      />
    </div>
  );
}

export default AlphaChanger;
