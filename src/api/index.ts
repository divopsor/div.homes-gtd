import { GitHubOAuthSdk } from "@divops/github-oauth-sdk";
import { MockGtdTodoAPI, MockUserAPI } from "./mock";

const g = GitHubOAuthSdk.of({
  baseUrl: "https://app.divops.kr/github-api",
  getAuthorization: () => {
    const value = localStorage.getItem("authorization");
    if (value == null || value === "") {
      throw new Error(`Authorization is null. (${value})`);
    }
    return value;
  },
});

const isLocal = process.env.NEXT_PUBLIC_IS_LOCAL != null;

export const UserAPI = isLocal ? MockUserAPI : g.UserAPI;

export const GtdTodoAPI = isLocal
  ? MockGtdTodoAPI
  : g.ResourceAPI.of({ model: "gtd-todo" });
