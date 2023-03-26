import { css } from "@emotion/react";
import { useState } from "react";
import { Spacing } from "./Space";
import { TextArea } from "./TextArea";

interface TextAreaFormProps {
  defaultText?: string;
  onSubmit: (inputText: string) => void | Promise<void>;
}

export function TextAreaForm({ defaultText, onSubmit }: TextAreaFormProps) {
  const [inputText, setInputText] = useState<string>(defaultText ?? "");

  return (
    <>
      <TextArea
        value={inputText}
        setValue={setInputText}
        rows={Math.max(2, inputText.split("\n").length)}
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
