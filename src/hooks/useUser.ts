import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserAPI } from "api";

const UserKey = ["UserKey"];

interface User {
  login: string;
}

export function useFlashUser() {
  const { data, isLoading, login, logout } = useUser();
  const [flashUser, setFlashUser] = useState<any>(null);

  useEffect(() => {
    setFlashUser(JSON.parse(localStorage.getItem(`useFlashUser`) ?? "null"));
  }, []);

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (typeof window !== "undefined") {
      window?.localStorage?.setItem(`useFlashUser`, JSON.stringify(data));
    }

    setFlashUser(data);
  }, [data]);

  return {
    data: flashUser,
    isLoading,
    login,
    logout,
  } as const;
}

export function useUser() {
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
