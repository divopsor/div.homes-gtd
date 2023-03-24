import { useState } from "react";
import { GtdTodoAPI } from "../../api/index";
import { ListItem } from "../../components/ListItem";
import { Txt } from "../../components/Txt";
import { TxtButton } from "../../components/TxtButton";
import { useList } from "../../hooks/useList";

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
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        }
        right={
          <>
            <TxtButton
              onClick={async () => {
                await GtdTodoAPI.update({
                  id: data.id,
                  resource: {},
                  summary: { contents: text },
                }).then(refetchTodoList);
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
      left={<Txt>{text}</Txt>}
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
              await GtdTodoAPI.delete({ id: data.id }).then(refetchTodoList);
            }}
          >
            삭제
          </TxtButton>
        </>
      }
    />
  );
}
