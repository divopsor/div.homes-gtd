import { css } from "@emotion/react";
import router from "next/router";
import { useUser } from "../hooks/useUser";
import { Stack } from "./Stack";

export function UserNav() {
  const { data: user, login, logout } = useUser();

  return (
    <Stack.Horizontal
      align="space-between"
      css={css`
        padding: 0 40px;
      `}
    >
      <h4>welcome {user?.login ?? "guest"}!</h4>

      {user == null ? (
        <button onClick={login}>로그인</button>
      ) : (
        <button
          onClick={() => {
            logout();
            router.reload();
          }}
        >
          로그아웃
        </button>
      )}
    </Stack.Horizontal>
  );
}