import React, { useState, useContext, useEffect } from "react";
import { ColorContext } from "context/ColorContext";
import { BsClipboardCheck, BsClipboardPlus } from "react-icons/bs";

import "./ColorFormatBlock.scss";
import { useColorValidator } from "hooks/useColorValidator";
import ColorParser from "classes/ColorParser";

type Props = {
  color: string;
  type: string;
};

function ColorFormatBlock({ color, type }: Props) {
  const { setColor } = useContext(ColorContext);

  const [copied, setCopied] = useState<Boolean>(false);
  const [edit, setEdit] = useState<Boolean>(false);
  const [newColor, setNewColor] = useState<string>("");

  function handleCopy(): void {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }

  const { validateRGB, validateHEX, validateHSL, validateCMYK } =
    useColorValidator();

  function handleEdit(): void {
    setEdit(true);
  }

  function validateColor(): void {
    const test = [
      validateHEX(newColor),
      validateCMYK(newColor),
      validateHSL(newColor),
      validateRGB(newColor),
    ].some((item) => item);

    if (test) {
      const parser = new ColorParser(newColor);
      setColor({
        color: parser.hsl.toString(),
        modifiedBy: "input",
      });
    }

    setEdit(false);
    setNewColor("");
  }

  return (
    <>
      {color && (
        <div className="color-block">
          {!edit && (
            <p className="color-block__text" onClick={handleEdit}>
              {color}
            </p>
          )}

          {edit && (
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              onBlur={validateColor}
              onKeyUp={(e) => (e.key === "Enter" ? validateColor() : () => {})}
              className="color-block__input"
              autoFocus
            />
          )}

          <button className="color-block__copy" onClick={handleCopy}>
            {!copied && <BsClipboardPlus />}
            {copied && <BsClipboardCheck className="copied" />}
          </button>
        </div>
      )}
    </>
  );
}

export default ColorFormatBlock;
