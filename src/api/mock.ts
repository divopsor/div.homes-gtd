export const MockGtdTodoAPI = {
  create: ({ resource, summary }: { resource: any; summary: any }) => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    localStorage.setItem(
      "TEST_GtdTodoAPI_LIST",
      JSON.stringify([
        ...list,
        {
          resource,
          summary: {
            id: generateRandomString(20),
            ...summary,
          },
        },
      ])
    );
  },
  delete: ({ id }: { id: string }) => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    localStorage.setItem(
      "TEST_GtdTodoAPI_LIST",
      JSON.stringify([...list.filter((x: any) => x.summary.id !== id)])
    );
  },
  readList: () => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    return { data: list.map((x: any) => x.summary) };
  },
};

function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const MockUserAPI = {
  fetchUser: () => {
    return {
      data: {
        login: "CreatiCoding",
      },
    };
  },
  loginUser: () => {},
};
