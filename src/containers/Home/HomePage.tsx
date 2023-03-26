import type { NextPage } from "next";
import { GtdTodoAPI } from "../../api";
import { UserNav } from "../../components/UserNav";
import { useLoginCallback, useList, useUser } from "../../hooks";
import { Welcome } from "./Welcome";
import { Container, Spacing, Stack, TextAreaForm } from "../../components/ui";
import { EditableListItem } from "../../components/ui/EditableListItem";

export const HomePage: NextPage = () => {
  const { loginLoading } = useLoginCallback();
  const { isLoading, data: user } = useUser();
  const [todoList, refetchTodoList] = useList("todo");

  if (loginLoading || isLoading) {
    return <div>로그인 중</div>;
  }

  if (user == null) {
    return <Welcome />;
  }

  return (
    <main>
      <Spacing size={10} />

      <UserNav />

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
