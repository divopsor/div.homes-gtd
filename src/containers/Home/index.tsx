import type { NextPage } from "next";
import { GtdTodoAPI } from "../../api/index";
import { Container } from "../../components/Container";
import { Spacing } from "../../components/Space";
import { Stack } from "../../components/Stack";
import { TextAreaForm } from "../../components/TextAreaForm";
import { UserNav } from "../../components/UserNav";
import { useUser } from "../../hooks/index";
import { useList } from "../../hooks/useList";
import { GtdItem } from "../../components/GtdItem";
import { useLoginCallback } from "../../hooks/useLoginCallback";
import { Txt } from "../../components/Txt";

export const Home: NextPage = () => {
  const { loginLoading } = useLoginCallback();
  const { isLoading, data: user } = useUser();
  const [todoList, refetchTodoList] = useList("todo");

  if (loginLoading || isLoading) {
    return <div>로그인 중</div>;
  }

  if (user == null) {
    return (
      <main>
        <Spacing size={10} />

        <UserNav />

        <Spacing size={30} />

        <Txt>환영합니다, 로그인을 하여 GTD를 시작해보세요!</Txt>
      </main>
    );
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
            <GtdItem key={data.id} data={data} />
          ))}
        </ul>
      </Container>
    </main>
  );
};
