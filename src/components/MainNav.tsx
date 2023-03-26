import { css } from "@emotion/react";
import router from "next/router";
import { useUser } from "hooks";
import { Stack } from "components/ui";

export function MainNav() {
  const { data: user, login, logout } = useUser();

  return (
    <Stack.Horizontal align="space-between">
      <h1>Getting Things Done</h1>

      <Stack.Horizontal align="right">
        <h4
          css={css`
            margin-right: 10px;
          `}
        >
          {user?.login ?? "guest"}
        </h4>

        {user == null ? (
          <button
            onClick={login}
            css={css`
              border: unset;
              background: unset;
              word-break: keep-all;
              text-decoration: underline;
              cursor: pointer;
              :hover {
                color: blue;
              }
            `}
          >
            로그인
          </button>
        ) : (
          <button
            onClick={() => {
              logout();
              router.reload();
            }}
            css={css`
              border: unset;
              background: unset;
              word-break: keep-all;
              text-decoration: underline;
              cursor: pointer;
              :hover {
                color: blue;
              }
            `}
          >
            로그아웃
          </button>
        )}
      </Stack.Horizontal>
    </Stack.Horizontal>
  );
}
