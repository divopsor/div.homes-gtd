import { useQuery } from "@tanstack/react-query";
import { GtdDoneAPI, GtdTodoAPI } from "api";
import { useEffect, useState } from "react";
import { useFlashUser } from "./useUser";

type Model = "todo" | "done";

export function useFlashList<T = any>(model: Model) {
  const [list, refetch, isLoading, isFetching] = useList(model);
  const [flashList, setFlashList] = useState<T[]>([]);

  useEffect(() => {
    setFlashList(
      JSON.parse(localStorage.getItem(`useFlashList-${model}`) ?? "[]")
    );
  }, []);

  useEffect(() => {
    if (list == null) {
      return;
    }

    if (list.length === 0) {
      return;
    }

    if (typeof window !== "undefined") {
      window?.localStorage?.setItem(
        `useFlashList-${model}`,
        JSON.stringify(list)
      );
    }

    setFlashList(list);
  }, [list]);

  return [flashList, refetch, isLoading, isFetching] as const;
}

export function useList(model: Model) {
  const { data: user } = useFlashUser();

  const {
    data: list,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["fetchList", user?.login, model],
    async () =>
      user?.login == null
        ? []
        : (await ModelAPI.of(model).readList({ pageSize: 100 })).data,
    { initialData: [] }
  );

  return [list, refetch, isLoading, isFetching] as const;
}

const ModelAPI = {
  of(model: Model) {
    switch (model) {
      case "todo": {
        return GtdTodoAPI;
      }
      default:
      case "todo": {
        return GtdDoneAPI;
      }
    }
  },
};
