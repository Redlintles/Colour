import "./ContentBlock.scss";
import React, { useRef, useEffect } from "react";

import ContentExample from "components/Frame/ContentExample/ContentExample";
import { Content } from "data/PageText";

import ReactMarkdown from "react-markdown";

type Props = {
  data: Content;
};

function ContentBlock({ data }: Props) {
  const contentRef = useRef<HTMLParagraphElement>(null);

  const { title, main, prevs } = data;

  useEffect(() => {
    if (contentRef.current) {
      const { current: element } = contentRef;

      element.innerHTML = main;
    }
  }, [contentRef]);

  return (
    <div className="content__block">
      <ReactMarkdown>{`${title}\n${main}`}</ReactMarkdown>
      {prevs && prevs.map((item, i) => <ContentExample key={i} color={item} />)}
    </div>
  );
}

export default ContentBlock;
