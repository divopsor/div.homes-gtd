import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserAPI } from "../api/index";

const UserKey = ["UserKey"];

interface User {
  login: string;
}

useUser.key = UserKey;

function useUser() {
  const [isLoading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);

    return () => clearTimeout(timer);
  }, []);

  const { data: user, refetch } = useQuery<{ data: User }>(
    [...UserKey, isLoading],
    UserAPI.fetchUser,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  const logout = () => {
    queryClient.invalidateQueries(UserKey);
    localStorage.removeItem("authorization");
    refetch();
  };

  return {
    data: user?.data,
    isLoading,
    login: UserAPI.loginUser,
    logout,
  } as const;
}

export { useUser };
