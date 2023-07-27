
export function useColorValidator() {

  function validatePercent(...values: string[]): boolean {
    // Validate Percent Values
    let percentExp = /^\d{0,3}\.?\d*%$/;

    for (let i of values) {
      if (percentExp.test(i)) {
        let j = parseFloat(i.replace("%", "")).toFixed(2);
        if (!(parseFloat(j) >= 0 && parseFloat(j) <= 100)) {
          return false;
        } else {
          return true;
        }

      } else {
        return false;
      }
    }

    return false;

  }

  function validateRGB(text: string): boolean {
    // Validate RGB Color Strings

    const reg: RegExp = /^rgba?\(.+\)$/i;
    const regAlpha = /,\.\d+\]$/g;

    if (reg.test(text)) {

      text = text
        .replace(/^rgba?/i, "")
        .replace("(", "[")
        .replace(")", "]")

      try {

        let match = text.match(regAlpha);

        if (match) {

          let x = match[0].replace(".", "0.");
          text = text.replace(regAlpha, x);
        }

        const parse: number[] = JSON.parse(text);

        if (parse.length !== 3 && parse.length !== 4) {
          return false;
        }

        for (let i = 0; i < 2; i++) {
          if (!(parse[i] >= 0 && parse[i] <= 255)) {
            return false
          }
        }

        if (parse.length === 4) {
          if (!(parse[3] <= 1 && parse[3] >= 0)) {
            return false;
          }
        }

        return true;

      } catch {
        return false
      }
    } else {
      return false
    }

  }

  function validateHEX(text: string): boolean {
    // Validdate Hex Color Strings

    const reg = /#[0-9a-fA-F]{3,6}/;

    if (reg.test(text)) {
      return true;
    }
    return false
  }

  function validateHSL(text: string): boolean {
    // Validate HSL Color Strings

    const reg = /^hsla?\(.+\)$/i;

    function validateHue(hue: string): boolean {

      const reg1 = /rad$/;
      const reg2 = /turn$/;
      const reg3 = /deg$/;

      if (reg1.test(hue)) {
        let n = parseFloat(hue.replace("rad", ""));
        if (n >= -6.28 && n <= 6.28) {
          return true;
        }
      } else if (reg2.test(hue)) {
        let n = parseFloat(hue.replace("turn", ""));
        if (n >= -1 && n <= 1) {
          return true
        }
      } else if (reg3.test(hue)) {
        let n = parseFloat(hue.replace("deg", ""));
        if (n >= -360 && n <= 360) {
          return true;
        }
      };

      return false;

    }

    if (reg.test(text)) {
      text = text
        .replace(/^hsla?/i, "")
        .replace("(", "")
        .replace(")", "");

      try {
        let parse = text.split(",");

        if (!validateHue(parse[0])) {
          return false;
        }

        parse.shift();

        if (!(validatePercent(...parse))) {
          return false;
        }

        return true;
      } catch {
        return false;
      }

    } else {
      return false;
    }

  }

  function validateCMYK(text: string): boolean {
    // Validate CMYK color codes

    const reg = /^cmyk\(.+\)$/i;

    if (reg.test(text)) {
      text = text
        .replace(/cmyk/i, "")
        .replace("(", "")
        .replace(")", "")

      try {
        let parse = text.split(",");

        if (!(validatePercent(...parse))) {
          return false;
        } else {
          return true;
        }

      } catch {
        return false;

      }
    }

    return false;

  }

  return {
    validateRGB,
    validateHEX,
    validateHSL,
    validateCMYK
  }

}