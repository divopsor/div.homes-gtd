import { css } from "@emotion/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GtdTodoAPI } from "../api/index";
import { Container } from "../components/Container";
import { Spacing } from "../components/Space";
import { Stack } from "../components/Stack";
import { UserNav } from "../components/UserNav";
import { useResetQueryParam, useUser } from "../hooks";
import { useList } from "../hooks/useList";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { resetQueryParam } = useResetQueryParam();
  const { isLoading, data: user, login, logout } = useUser();
  const [todoList, refetchTodoList] = useList("todo");
  const [inputText, setInputText] = useState<string>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = router.query.code;

    if (code == null || Array.isArray(code)) {
      setLoading(false);
      return;
    }

    setLoading(true);

    localStorage.setItem("authorization", code);

    resetQueryParam("code");
  }, [router]);

  if (loading || isLoading) {
    return <div>로그인 중</div>;
  }

  return (
    <main>
      <Spacing size={10} />

      <UserNav />

      <Spacing size={30} />

      {user == null ? (
        <></>
      ) : (
        <Container width={720}>
          <Stack.Vertical align="right">
            <textarea
              spellCheck={false}
              css={css`
                word-break: keep-all;
                resize: none;
                width: 100%;
                outline: none !important;
                :focus {
                  background-color: #f0f0f0;
                }
              `}
              rows={Math.max(inputText?.split("\n").length ?? 0, 2)}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Spacing size={4} />
            <button
              onClick={async () => {
                await GtdTodoAPI.create({
                  resource: {},
                  summary: { contents: inputText },
                });
                setInputText("");
                await refetchTodoList();
              }}
              css={css`
                word-break: keep-all;
              `}
            >
              입력
            </button>
          </Stack.Vertical>

          <Spacing size={20} />

          <ul>
            {todoList.map((x: any) => (
              <li>
                <Stack.Horizontal>
                  <p
                    css={css`
                      width: 100%;
                      font-size: 1.6rem;
                      word-break: keep-all;
                      white-space: pre-line;
                    `}
                  >
                    {x.contents}
                  </p>
                  <button
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
                    onClick={async () => {
                      await GtdTodoAPI.delete({ id: x.id });
                      await refetchTodoList();
                    }}
                  >
                    삭제
                  </button>
                </Stack.Horizontal>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </main>
  );
};

export default Home;
