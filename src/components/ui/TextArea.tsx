import { css } from "@emotion/react";
import { Txt } from "./Txt";

interface TextAreaProps {
  className?: string;
  value: string;
  setValue: (_: string) => void;
  rows?: number;
  cols?: number;
}
export function TextArea({
  className,
  setValue,
  value,
  rows,
  cols,
}: TextAreaProps) {
  return (
    <textarea
      className={className}
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
      {value.replace(
        /(https?:\/\/\S+)/g,
        '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">Link</a>'
      )}
    </Txt>
  );
};
