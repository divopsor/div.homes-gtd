import { Spacing, Txt } from "../../components/ui";
import { UserNav } from "../../components/UserNav";

export function Welcome() {
  return (
    <main>
      <Spacing size={10} />

      <UserNav />

      <Spacing size={30} />

      <Txt>환영합니다, 로그인을 하여 GTD를 시작해보세요!</Txt>
    </main>
  );
}
