import { useQuery } from "@tanstack/react-query";
import { GtdTodoAPI } from "../api/index";
import { useUser } from "./useUser";

type Model = "todo";

export function useList(model: Model) {
  const { data: user } = useUser();

  const {
    data: list,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["fetchList", user?.login, model],
    async () =>
      user?.login == null ? [] : (await ModelAPI.of(model).readList()).data,
    { initialData: [] }
  );

  return [list, refetch, isLoading, isFetching] as const;
}

const ModelAPI = {
  of(model: "todo") {
    switch (model) {
      case "todo": {
        return GtdTodoAPI;
      }
    }
  },
};
