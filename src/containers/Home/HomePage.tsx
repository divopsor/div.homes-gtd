import type { NextPage } from "next";
import { GtdDoneAPI, GtdTodoAPI } from "api";
import { useLoginCallback, useFlashList, useUser } from "hooks";
import { Welcome } from "../Welcome";
import {
  Container,
  Spacing,
  Stack,
  TextAreaForm,
  EditableListItem,
} from "components/ui";
import { MainMenus } from "../../components/MainMenus";

export const HomePage: NextPage = () => {
  const [todoList, refetchTodoList] = useFlashList("todo");
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

      <MainMenus />

      <Spacing size={30} />

      <Container width={720}>
        <Stack.Vertical align="right">
          <TextAreaForm
            onSubmit={async (inputText) => {
              const resource = {
                contents: inputText,
                priority: todoList.length,
              };
              await GtdTodoAPI.create({ resource, summary: { ...resource } });
              await refetchTodoList();
            }}
          />
        </Stack.Vertical>

        <Spacing size={20} />

        <ul>
          {todoList
            .sort((a: any, b: any) =>
              (a.priority ?? 0) > (b.priority ?? 0) ? 1 : -1
            )
            .map((data: any, index: number) => (
              <EditableListItem
                key={data.id}
                data={data}
                viewButtons={{
                  완료: async () => {
                    const resource = {
                      contents: data.contents,
                      priority: data.priority,
                    };
                    await GtdDoneAPI.create({
                      resource,
                      summary: { ...resource },
                    });
                    await GtdTodoAPI.delete({ id: data.id });
                    await refetchTodoList();
                  },
                  수정: ({ setMode }) => setMode("edit"),
                  삭제: async () => {
                    await GtdTodoAPI.delete({ id: data.id });
                    await refetchTodoList();
                  },
                  "⬆": async () => {
                    if (index <= 0) {
                      return;
                    }
                    const a = todoList[index];
                    const b = todoList[index - 1];

                    const aResource = {
                      contents: a.contents,
                      priority: b.priority,
                    };

                    await GtdTodoAPI.update({
                      id: a.id,
                      resource: aResource,
                      summary: { ...aResource },
                    });

                    const bResource = {
                      contents: b.contents,
                      priority: a.priority,
                    };

                    await GtdTodoAPI.update({
                      id: b.id,
                      resource: bResource,
                      summary: { ...bResource },
                    });

                    await refetchTodoList();
                  },
                  "⬇": async () => {
                    if (index >= todoList.length - 1) {
                      return;
                    }
                    const a = todoList[index];
                    const b = todoList[index + 1];

                    const aResource = {
                      contents: a.contents,
                      priority: b.priority,
                    };

                    await GtdTodoAPI.update({
                      id: a.id,
                      resource: aResource,
                      summary: { ...aResource },
                    });

                    const bResource = {
                      contents: b.contents,
                      priority: a.priority,
                    };

                    await GtdTodoAPI.update({
                      id: b.id,
                      resource: bResource,
                      summary: { ...bResource },
                    });

                    await refetchTodoList();
                  },
                }}
                editButtons={{
                  제출: async ({ text, setMode }) => {
                    const resource = {
                      contents: text,
                      priority: data.priority,
                    };
                    await GtdTodoAPI.update({
                      id: data.id,
                      resource,
                      summary: { ...resource },
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
