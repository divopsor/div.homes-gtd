import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GtdTodoAPI } from "../api/index";
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
    <div>
      <Head>
        <title>Hello world!</title>
      </Head>

      <main>
        <h1>Getting Things Done</h1>
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

        <div>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <br></br>
          <button
            onClick={async () => {
              await GtdTodoAPI.create({
                resource: {
                  contents: inputText,
                },
                summary: {
                  contents: inputText?.split("\n")[0],
                },
              });
              setInputText("");
              await refetchTodoList();
            }}
          >
            입력
          </button>
        </div>

        <ul>
          {todoList.map((x: any) => (
            <li>{x.contents}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
