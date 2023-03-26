import { css } from "@emotion/react";
import { text } from "stream/consumers";
import { Txt } from "./Txt";

interface TextAreaProps {
  value: string;
  setValue: (_: string) => void;
  rows?: number;
  cols?: number;
}
export function TextArea({ setValue, value, rows, cols }: TextAreaProps) {
  return (
    <textarea
      spellCheck={false}
      css={css`
        resize: none;
        ${cols == null ? "width: 100%;" : ""}
        font-size: 1.6rem;
        word-break: keep-all;
        white-space: pre-line;
        font-family: "Noto Sans KR", sans-serif;
      `}
      value={value}
      rows={rows ?? value.split("\n").length}
      cols={cols}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

TextArea.View = ({ value }: Pick<TextAreaProps, "value">) => {
  return (
    <Txt
      css={css`
        padding: 3px;
      `}
    >
      {value}
    </Txt>
  );
};
