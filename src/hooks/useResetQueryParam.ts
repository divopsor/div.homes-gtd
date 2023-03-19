import { useRouter } from "next/router";

export function useResetQueryParam() {
  const router = useRouter();

  return {
    resetQueryParam: (key: string) => {
      const query = { ...router.query };

      delete query[key];

      router.replace({ pathname: router.pathname, query });
    },
  } as const;
}
