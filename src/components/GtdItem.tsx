import { css } from "@emotion/react";
import { useState } from "react";
import { GtdTodoAPI } from "../api/index";
import { ListItem } from "./ListItem";
import { Txt } from "./Txt";
import { TxtButton } from "./TxtButton";
import { useList } from "../hooks/useList";

interface GtdItemProps {
  data: { id: string; contents: string };
}
export function GtdItem({ data }: GtdItemProps) {
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
        right={
          <>
            <TxtButton
              onClick={async () => {
                await GtdTodoAPI.update({
                  id: data.id,
                  resource: { contents: text },
                  summary: { contents: text },
                });
                await refetchTodoList();
                setMode("view");
              }}
            >
              제출
            </TxtButton>
            <TxtButton
              onClick={async () => {
                setText(data.contents);
                setMode("view");
              }}
            >
              취소
            </TxtButton>
          </>
        }
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
