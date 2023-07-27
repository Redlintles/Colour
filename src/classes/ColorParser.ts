interface Color {
  id: string;
  toString(): string;
  clamp(num: number, min: number, max: number): number;
}

interface RGBColor extends Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface HEXColor extends RGBColor {}

interface HSLColor extends Color {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}
interface CMYKColor extends Color {
  cyan: number;
  magenta: number;
  yellow: number;
  black: number;
  alpha: number;
}

class Color implements Color {
  clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }
  toString(): string {
    return "";
  }
}

class RGBColor extends Color implements RGBColor {
  constructor(red: number, green: number, blue: number, alpha: number = 1) {
    super();
    this.red = this.clamp(red, 0, 255);
    this.green = this.clamp(green, 0, 255);
    this.blue = this.clamp(blue, 0, 255);
    this.alpha = this.clamp(alpha, 0, 1);
  }
  toString(): string {
    const { red, green, blue, alpha } = this;
    if (alpha !== 1) {
      return `rgba(${red},${green},${blue},${alpha})`;
    } else {
      return `rgb(${red},${green},${blue})`;
    }
  }
  get components(): number[] {
    const { red, green, blue, alpha } = this;
    return [red, green, blue, alpha];
  }
}

class HEXColor extends RGBColor implements HEXColor {
  constructor(red: number, green: number, blue: number, alpha: number = 1) {
    super(red, green, blue, alpha);
  }
  toString(): string {
    const { red, green, blue, alpha } = this;

    let hex = "#";
    for (let i of [red, green, blue]) {
      let parsed = i.toString(16);
      if (parsed.length === 1) {
        parsed = parsed.padStart(2, "0");
      }
      hex += parsed;
    }

    if (alpha && alpha !== 1) {
      let parsed = parseInt((this.alpha * 255).toString()).toString(16);
      if (parsed.length === 1) {
        parsed = parsed.padStart(2, "0");
      }
      hex += parsed;
    }

    return hex;
  }
}

class HSLColor extends Color implements HSLColor {
  constructor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number = 1
  ) {
    super();
    this.hue = this.clamp(hue, 0, 360);
    this.saturation = this.clamp(saturation, 0, 100);
    this.lightness = this.clamp(lightness, 0, 100);
    this.alpha = this.clamp(alpha, 0, 1);
  }

  toString(): string {
    const { hue, saturation, lightness, alpha } = this;

    if (alpha !== 1) {
      return `hsla(${hue}deg,${saturation}%,${lightness}%,${parseInt(
        (alpha * 100).toString()
      )}%)`;
    } else {
      return `hsl(${hue}deg,${saturation}%,${lightness}%)`;
    }
  }

  get components(): number[] {
    const { hue, saturation, lightness, alpha } = this;
    return [hue, saturation, lightness, alpha];
  }
}

class CMYKColor extends Color implements CMYKColor {
  constructor(
    cyan: number,
    magenta: number,
    yellow: number,
    black: number,
    alpha: number = 1
  ) {
    super();
    this.cyan = this.clamp(cyan, 0, 100);
    this.magenta = this.clamp(magenta, 0, 100);
    this.yellow = this.clamp(yellow, 0, 100);
    this.black = this.clamp(black, 0, 100);
    this.alpha = this.clamp(alpha, 0, 1);
  }
  toString(): string {
    const { cyan, magenta, yellow, black } = this;
    return `cmyk(${cyan}%,${magenta}%,${yellow}%,${black}%)`;
  }
  get components(): number[] {
    const { cyan, magenta, yellow, black, alpha } = this;
    return [cyan, magenta, yellow, black, alpha];
  }
}

interface ColorParser {
  color: HSLColor | RGBColor | HEXColor | CMYKColor;
}

export interface ColorParserSchema extends ColorParser {}

class ColorParser implements ColorParser {
  private invalidColorMessage: string =
    "InvalidColorError: Color must be expressed only in the following color formats: cmyk,rgba?,hex or hsla?";

  private validateHEX(color: string): boolean {
    const resumedHEX = /^#[0-9a-fA-F]{3,4}$/;
    const fullHEX = /^#[0-9a-fA-F]{6,8}$/;

    if ([4, 5, 7, 9].includes(color.length)) {
      return resumedHEX.test(color) || fullHEX.test(color);
    }
    return false;
  }
  private validateHSL(color: string): boolean {
    // hsl(30deg,100%,50%);
    // hsla(20deg,100%,50%,45%);

    const onlyHSL = /^hsl\((?:\d{1,3}deg)(?:,\d{1,3}%){2}\)$/;
    const onlyHSLA = /^hsla\((?:\d{1,3}deg)(?:,\d{1,3}%){3}\)$/;

    return onlyHSL.test(color) || onlyHSLA.test(color);
  }
  private validateRGB(color: string): boolean {
    // rgb(255,255,255);
    // rgba(255,255,255,0.5);

    const onlyRGB = /^rgb\((?:\d{1,3},?){3}\)$/;
    const onlyRGBA = /^rgba\((?:\d{1,3},){3}(?:[0-1]\.\d+)\)$/;

    return onlyRGB.test(color) || onlyRGBA.test(color);
  }
  private validateCMYK(color: string): boolean {
    const regex = /^cmyk\((?:\d{1,3}%,?){4}\)$/;

    return regex.test(color);
  }
  static splitHSL(color: string): HSLColor {
    const regex = /\((.+)\)/;
    const match = color.match(regex) as RegExpMatchArray;

    let [hue, saturation, lightness, alpha] = match[1]
      .split(",")
      .map((item) => parseFloat(item));
    alpha = isNaN(alpha) ? 0 : alpha / 100;

    if (typeof alpha === "number") {
      return new HSLColor(hue, saturation, lightness, alpha);
    } else {
      return new HSLColor(hue, saturation, lightness);
    }
  }
  static splitHEX(color: string): HEXColor {
    color = color.slice(1);
    const colorComponents = [];

    console.log(color);

    if ([3, 4].includes(color.length)) {
      let extended = "";
      for (let i of color) {
        extended += i.repeat(2);
      }
      color = extended;
    }

    for (let i = 0; i < color.length; i += 2) {
      const component = color.slice(i, i + 2);
      colorComponents.push(parseInt(component, 16));
    }

    let [red, green, blue, alpha] = colorComponents;
    alpha = isNaN(alpha) ? 0 : alpha / 100;

    if (typeof alpha === "number") {
      alpha /= 255;
      return new HEXColor(red, green, blue, alpha);
    } else {
      return new HEXColor(red, green, blue);
    }
  }
  static splitRGB(color: string): RGBColor {
    const regex = /\((.+)\)/;
    const match = color.match(regex) as RegExpMatchArray;

    let [red, green, blue, alpha] = match[1]
      .split(",")
      .map((item) => parseFloat(item));

    alpha = isNaN(alpha) ? 0 : alpha / 100;

    if (typeof alpha === "number") {
      return new RGBColor(red, green, blue, alpha);
    } else {
      return new RGBColor(red, green, blue);
    }
  }
  static splitCMYK(color: string): CMYKColor {
    const regex = /\((.+)\)/;
    const match = color.match(regex) as RegExpMatchArray;

    let [cyan, magenta, yellow, black, alpha] = match[1]
      .split(",")
      .map((item) => parseFloat(item));

    alpha = isNaN(alpha) ? 0 : alpha / 100;

    if (typeof alpha === "number") {
      return new CMYKColor(cyan, magenta, yellow, black);
    } else {
      return new CMYKColor(cyan, magenta, yellow, black, alpha);
    }
  }

  private hueToRGB(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  private HSLtoRGB(
    hue: number,
    saturation: number,
    lightness: number
  ): RGBColor {
    let red: number = 0;
    let green: number = 0;
    let blue: number = 0;

    hue /= 360;
    saturation /= 100;
    lightness /= 100;

    if (saturation === 0) {
      red = green = blue = lightness;
    } else {
      let q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      let p = 2 * lightness - q;
      red = this.hueToRGB(p, q, hue + 1 / 3);
      green = this.hueToRGB(p, q, hue);
      blue = this.hueToRGB(p, q, hue - 1 / 3);
    }

    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    return new RGBColor(red, green, blue, this.color.alpha);
  }
  private RGBtoHSL(red: number, green: number, blue: number): HSLColor {
    red /= 255;
    green /= 255;
    blue /= 255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);

    let h: number = (max + min) / 2;
    let s: number = (max + min) / 2;
    let l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;
        case green:
          h = (blue - red) / d + 2;
          break;
        case blue:
          h = (red - green) / d + 4;
          break;
      }
      h /= 6;
    }

    h = parseInt((h * 360).toString());
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return new HSLColor(h, s, l, this.color.alpha);
  }
  private RGBtoCMYK(red: number, green: number, blue: number): CMYKColor {
    let black = 1 - Math.max(red, green, blue) / 255;
    let cyan = (1 - red / 255 - black) / (1 - black);
    let magenta = (1 - green / 255 - black) / (1 - black);
    let yellow = (1 - blue / 255 - black) / (1 - black);

    cyan = isNaN(cyan) ? 0 : cyan;
    magenta = isNaN(magenta) ? 0 : magenta;
    yellow = isNaN(yellow) ? 0 : yellow;
    black = isNaN(black) ? 0 : black;

    cyan = Math.round(cyan * 100);
    magenta = Math.round(magenta * 100);
    yellow = Math.round(yellow * 100);
    black = Math.round(black * 100);

    return new CMYKColor(cyan, magenta, yellow, black, this.color.alpha);
  }

  private CMYKtoRGB(
    cyan: number,
    magenta: number,
    yellow: number,
    black: number
  ): RGBColor {
    let red = 255 * (1 - cyan / 100) * (1 - black / 100);
    let green = 255 * (1 - magenta / 100) * (1 - black / 100);
    let blue = 255 * (1 - yellow / 100) * (1 - black / 100);

    return new RGBColor(red, green, blue, this.color.alpha);
  }

  constructor(color: string | RGBColor | CMYKColor | HSLColor | HEXColor) {
    if (typeof color === "string") {
      if (this.validateHEX(color)) {
        this.color = ColorParser.splitHEX(color);
      } else if (this.validateCMYK(color)) {
        this.color = ColorParser.splitCMYK(color);
      } else if (this.validateRGB(color)) {
        this.color = ColorParser.splitRGB(color);
      } else if (this.validateHSL(color)) {
        this.color = ColorParser.splitHSL(color);
      }
    } else {
      this.color = color;
    }
  }

  get hsl(): HSLColor {
    if (this.color instanceof HSLColor) {
      return this.color;
    } else if (
      this.color instanceof RGBColor ||
      this.color instanceof HEXColor
    ) {
      const { red, green, blue } = this.color;
      return this.RGBtoHSL(red, green, blue);
    } else if (this.color instanceof CMYKColor) {
      const { cyan, magenta, yellow, black } = this.color;
      const { red, green, blue } = this.CMYKtoRGB(cyan, magenta, yellow, black);
      return this.RGBtoHSL(red, green, blue);
    }
    return new HSLColor(0, 100, 50);
  }

  get rgb(): RGBColor {
    if (this.color instanceof RGBColor) {
      return this.color;
    } else if (this.color instanceof HEXColor) {
      const { red, green, blue, alpha } = this.color;
      return new RGBColor(red, green, blue, alpha);
    } else if (this.color instanceof HSLColor) {
      const { hue, saturation, lightness } = this.color;
      const result = this.HSLtoRGB(hue, saturation, lightness);
      return result;
    } else if (this.color instanceof CMYKColor) {
      const { cyan, magenta, yellow, black } = this.color;
      const result = this.CMYKtoRGB(cyan, magenta, yellow, black);
      return result;
    }
    return new RGBColor(255, 255, 255, 0.5);
  }

  get hex(): HEXColor {
    if (this.color instanceof HEXColor) {
      return this.color;
    } else if (this.color instanceof RGBColor) {
      let { red, green, blue, alpha } = this.color;

      return new HEXColor(red, green, blue, alpha);
    } else if (this.color instanceof HSLColor) {
      let { hue, saturation, lightness } = this.color;
      let { red, green, blue, alpha } = this.HSLtoRGB(
        hue,
        saturation,
        lightness
      );

      return new HEXColor(red, green, blue, alpha);
    } else if (this.color instanceof CMYKColor) {
      const { cyan, magenta, yellow, black } = this.color;
      const { red, green, blue, alpha } = this.CMYKtoRGB(
        cyan,
        magenta,
        yellow,
        black
      );

      return new HEXColor(red, green, blue, alpha);
    }

    return new HEXColor(255, 125, 255, 255);
  }

  get cmyk(): CMYKColor {
    if (this.color instanceof CMYKColor) {
      return this.color;
    } else if (
      this.color instanceof RGBColor ||
      this.color instanceof HEXColor
    ) {
      const { red, green, blue } = this.color;
      return this.RGBtoCMYK(red, green, blue);
    } else if (this.color instanceof HSLColor) {
      const { hue, saturation, lightness } = this.color;
      const { red, green, blue } = this.HSLtoRGB(hue, saturation, lightness);
      return this.RGBtoCMYK(red, green, blue);
    }
    return new CMYKColor(0, 0, 0, 100, 100);
  }
}

export default ColorParser;

export { RGBColor, HEXColor, HSLColor, CMYKColor };
