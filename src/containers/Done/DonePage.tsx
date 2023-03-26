import type { NextPage } from "next";
import { GtdDoneAPI } from "api";
import { useLoginCallback, useList, useUser } from "hooks";
import { Welcome } from "../Welcome";
import { Container, Spacing, EditableListItem, Txt } from "components/ui";

export const DonePage: NextPage = () => {
  const [todoList, refetchTodoList] = useList("done");
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
        <Txt>완료된 목록</Txt>
        
        <Spacing size={20} />

        <ul>
          {todoList.map((data: any) => (
            <EditableListItem
              key={data.id}
              data={data}
              viewButtons={{
                삭제: async () => {
                  await GtdDoneAPI.delete({ id: data.id });
                  await refetchTodoList();
                },
              }}
            />
          ))}
        </ul>
      </Container>
    </main>
  );
};
