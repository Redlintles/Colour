import {
  PalleteGen,
  palleteType,
  palleteGenContext,
} from "context/PalleteGenContext";
import React, { ChangeEvent, useContext } from "react";

import "./PalleteGenStyle.scss";
import PalletePoints from "classes/PalletePoints";
import {
  ColorBarContext,
  ColorBarContextSchema,
} from "../../../context/ColorBarContext";

function PalleteGenStyle() {
  const { pallete, setPallete } = useContext(palleteGenContext);
  const { colorBarData, setColorBarData } = useContext(ColorBarContext);

  function classManager(input: HTMLInputElement) {
    const label = input.parentElement;
    if (label) {
      const form = label.parentElement;
      if (form) {
        const children = form.querySelectorAll(".pallete-gen-form__input");

        if (children) {
          children.forEach((label) => {
            label.classList.remove("form-input--active");
          });
        }
        label.classList.add("form-input--active");
      }
    }
  }
  function changePalleteType(e: ChangeEvent) {
    const { target: input } = e;

    if (input instanceof HTMLInputElement && pallete.canvasOBJ) {
      const type = input.value as palleteType;

      classManager(input);

      pallete.canvasOBJ.drawOnlyWheel();

      const { coord } = colorBarData.mainColor;
      const finder = new PalletePoints(
        pallete.canvasOBJ,
        coord,
        type,
        pallete.saturationGrad
      );

      setPallete((prev: PalleteGen): PalleteGen => {
        return {
          ...prev,
          mainColor: colorBarData.mainColor,
          secondaryColors: finder.secondaryColors,
          type,
        };
      });
      setColorBarData((prev: ColorBarContextSchema): ColorBarContextSchema => {
        return {
          ...prev,
          mainColor: colorBarData.mainColor,
          secondaryColors: finder.secondaryColors,
          palleteType: type,
        };
      });

      pallete.canvasOBJ.drawManager(coord, finder.points);
    }
  }

  return (
    <section className="pallete-gen__style">
      <form className="pallete-gen-form">
        <label className="pallete-gen-form__input form-input--active">
          <span>A</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="analog"
            checked={colorBarData.palleteType === "analog" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>M</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="monocromatic"
            checked={colorBarData.palleteType === "monocromatic" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>T</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="triple"
            checked={colorBarData.palleteType === "triple" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>S</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="square"
            checked={colorBarData.palleteType === "square" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>K</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="composed"
            checked={colorBarData.palleteType === "composed" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>C</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="complementar"
            checked={colorBarData.palleteType === "complementar" ? true : false}
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>Y</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="slash-complementar"
            checked={
              colorBarData.palleteType === "slash-complementar" ? true : false
            }
          />
        </label>
        <label className="pallete-gen-form__input">
          <span>X</span>
          <input
            type="radio"
            name="pallete-gen-style"
            onChange={changePalleteType}
            value="double-slash-complementar"
            checked={
              colorBarData.palleteType === "double-slash-complementar"
                ? true
                : false
            }
          />
        </label>
      </form>
    </section>
  );
}

export default PalleteGenStyle;
