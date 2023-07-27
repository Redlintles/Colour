import { PageTextContent } from "data/PageText";
import ContentBlock from "components/Frame/ContentBlock/ContentBlock";

import "./TextContent.scss";

type Props = {
  data: PageTextContent;
};

function TextContent({ data }: Props) {
  return (
    <section className="text-content">
      <h3 className="content__section-title">{data.contentTitle}</h3>

      {data &&
        data.items.map((item) => <ContentBlock data={item} key={item.main} />)}
    </section>
  );
}

export default TextContent;
