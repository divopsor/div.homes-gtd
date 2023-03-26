import { css } from "@emotion/react";
import { useState } from "react";
import { Spacing } from "./Space";

interface TextAreaFormProps {
  defaultText?: string;
  onSubmit: (inputText: string) => void | Promise<void>;
}

export function TextAreaForm({ defaultText, onSubmit }: TextAreaFormProps) {
  const [inputText, setInputText] = useState<string>(defaultText ?? "");

  return (
    <>
      <textarea
        spellCheck={false}
        css={css`
          word-break: keep-all;
          resize: none;
          width: 100%;
          outline: none !important;
          :focus {
            background-color: #f0f0f0;
          }
        `}
        rows={Math.max(inputText?.split("\n").length ?? 0, 2)}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Spacing size={4} />
      <button
        onClick={async () => {
          setInputText("");
          await onSubmit(inputText);
        }}
        css={css`
          word-break: keep-all;
        `}
      >
        입력
      </button>
    </>
  );
}
