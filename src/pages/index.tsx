import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useResetQueryParam, useUser } from "../hooks";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { resetQueryParam } = useResetQueryParam();
  const { isLoading, data: user, login, logout } = useUser();

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
        <h1>hello world! GTD!</h1>
        <div>login: {user?.login}</div>
        {user == null ? (
          <button onClick={login}>로그인</button>
        ) : (
          <button onClick={logout}>로그아웃</button>
        )}
      </main>
    </div>
  );
};

export default Home;
