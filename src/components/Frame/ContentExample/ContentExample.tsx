import "./ContentExample.scss";
import ColorParser from "classes/ColorParser";

type Props = {
  color: string;
};

function ContentExample({ color }: Props) {
  return (
    <div className="content__example">
      <div
        className="example__preview"
        style={{
          background: color.startsWith("cmyk")
            ? new ColorParser(color).rgb.toString()
            : color,
        }}
      ></div>
      <div className="example__text">{color}</div>
    </div>
  );
}

export default ContentExample;
