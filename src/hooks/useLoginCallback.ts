import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useResetQueryParam } from "./useResetQueryParam";

export function useLoginCallback() {
  const { resetQueryParam } = useResetQueryParam();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  return {
    loginLoading: loading,
  } as const;
}
