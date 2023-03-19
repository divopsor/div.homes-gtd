import { GitHubOAuthSdk } from "@divops/github-oauth-sdk";

const gitHubOAuthSDK = GitHubOAuthSdk.of({
  baseUrl: "https://app.divops.kr/github-api",
  getAuthorization: () => {
    const value = localStorage.getItem("authorization");
    if (value == null || value === "") {
      throw new Error(`Authorization is null. (${value})`);
    }
    return value;
  },
});

export const UserAPI = gitHubOAuthSDK.UserAPI;
export const GtdTodoAPI = gitHubOAuthSDK.ResourceAPI.of({ model: "gtd-todo" });
