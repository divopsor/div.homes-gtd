import { css } from "@emotion/react";
import { useState } from "react";
import { GtdTodoAPI } from "../api/index";
import { useList } from "../hooks/useList";
import { ListItem, Txt, TxtButton } from "./ui";

interface GtdItemProps {
  data: { id: string; contents: string };
  buttons: Array<{
    name: string;
    onClick: (_: {
      text: string;
      setMode: (__: "view" | "edit") => void;
      setText: (__: string) => void;
    }) => void | Promise<void>;
  }>;
}

export function GtdItem({ data, buttons }: GtdItemProps) {
  const [text, setText] = useState<string>(data.contents);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [, refetchTodoList] = useList("todo");

  if (mode === "edit") {
    return (
      <ListItem
        left={
          <textarea
            css={css`
              resize: none;
              width: 100%;
              font-size: 1.6rem;
              word-break: keep-all;
              white-space: pre-line;
              font-family: "Noto Sans KR", sans-serif;
            `}
            value={text}
            rows={text.split("\n").length}
            onChange={(e) => setText(e.target.value)}
          />
        }
        right={buttons.map((button) => (
          <TxtButton onClick={() => button.onClick({ text, setMode, setText })}>
            {button.name}
          </TxtButton>
        ))}
      />
    );
  }

  return (
    <ListItem
      left={
        <Txt
          css={css`
            padding: 3px;
          `}
        >
          {text}
        </Txt>
      }
      right={
        <>
          <TxtButton
            onClick={async () => {
              setMode("edit");
            }}
          >
            수정
          </TxtButton>
          <TxtButton
            onClick={async () => {
              await GtdTodoAPI.delete({ id: data.id });
              await refetchTodoList();
            }}
          >
            삭제
          </TxtButton>
        </>
      }
    />
  );
}
