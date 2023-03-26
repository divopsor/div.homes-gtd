import type { NextPage } from "next";
import { GtdDoneAPI, GtdTodoAPI } from "api";
import { useLoginCallback, useList, useUser } from "hooks";
import { Welcome } from "../Welcome";
import {
  Container,
  Spacing,
  Stack,
  TextAreaForm,
  EditableListItem,
} from "components/ui";

export const HomePage: NextPage = () => {
  const [todoList, refetchTodoList] = useList("todo");
  const { loginLoading } = useLoginCallback();
  const { isLoading, data: user } = useUser();

  if (loginLoading || isLoading) {
    return <div>로그인 중</div>;
  }

  if (user == null) {
    return <Welcome />;
  }

  return (
    <main>
      <Spacing size={30} />

      <Container width={720}>
        <Stack.Vertical align="right">
          <TextAreaForm
            onSubmit={async (inputText) => {
              await GtdTodoAPI.create({
                resource: { contents: inputText },
                summary: { contents: inputText },
              });
              await refetchTodoList();
            }}
          />
        </Stack.Vertical>

        <Spacing size={20} />

        <ul>
          {todoList.map((data: any) => (
            <EditableListItem
              key={data.id}
              data={data}
              viewButtons={{
                완료: async () => {
                  await GtdDoneAPI.create({
                    resource: { contents: data.contents },
                    summary: { contents: data.contents },
                  });
                  await GtdTodoAPI.delete({ id: data.id });
                  await refetchTodoList();
                },
                수정: ({ setMode }) => setMode("edit"),
                삭제: async () => {
                  await GtdTodoAPI.delete({ id: data.id });
                  await refetchTodoList();
                },
              }}
              editButtons={{
                제출: async ({ text, setMode }) => {
                  await GtdTodoAPI.update({
                    id: data.id,
                    resource: { contents: text },
                    summary: { contents: text },
                  });
                  await refetchTodoList();
                  setMode("view");
                },
                취소: ({ setText, setMode }) => {
                  setText(data.contents);
                  setMode("view");
                },
              }}
            />
          ))}
        </ul>
      </Container>
    </main>
  );
};
