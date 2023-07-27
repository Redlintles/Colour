import React from "react";
import { useState } from "react";
import { BsClipboardCheck, BsClipboardPlus } from "react-icons/bs";

import "./CopyBtn.scss";

type Props = {
  value: string;
};

function CopyBtn({ value }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleCopy(): void {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button className="copy-btn" onClick={handleCopy}>
      {!copied && <BsClipboardPlus className="copy-btn__standard" />}
      {copied && <BsClipboardCheck className="copy-btn__copied" />}
    </button>
  );
}

export default CopyBtn;
