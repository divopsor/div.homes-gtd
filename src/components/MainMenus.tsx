import { css } from "@emotion/react";
import { GtdTodoAPI } from "../api/index";
import { useList } from "../hooks/useList";
import { Container } from "./ui/Container";
import { TxtButton } from "./ui/TxtButton";

export function MainMenus() {
  const [todoList, refetchTodoList] = useList("todo");

  if (todoList == null || todoList.length === 0) {
    return null;
  }

  return (
    <Container
      css={css`
        text-align: right;
      `}
    >
      <TxtButton
        css={css`
          padding: 0;
        `}
        onClick={async () => {
          if (todoList == null || todoList.length === 0) {
            alert("잠시 후 다시 시도해주세요.");
            return;
          }

          for (let i = 0; i < todoList.length; i++) {
            const todo = todoList[i];

            if (Number(todo.priority) === i) {
              continue;
            }

            const resource = {
              contents: todo.contents,
              priority: i,
            };

            await GtdTodoAPI.update({
              id: todo.id,
              resource,
              summary: { ...resource },
            });
          }

          await refetchTodoList();
        }}
      >
        재정렬
      </TxtButton>
    </Container>
  );
}
