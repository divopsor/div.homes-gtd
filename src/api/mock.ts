export const MockGtdTodoAPI = {
  create: async ({ resource, summary }: { resource: any; summary: any }) => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    localStorage.setItem(
      "TEST_GtdTodoAPI_LIST",
      JSON.stringify([
        ...list,
        {
          id: generateRandomString(20),
          resource,
          summary,
        },
      ])
    );
    return;
  },
  delete: async ({ id }: { id: string }) => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    localStorage.setItem(
      "TEST_GtdTodoAPI_LIST",
      JSON.stringify([...list.filter((x: any) => x.id !== id)])
    );
    return;
  },
  readList: async () => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );
    return { data: list.map((x: any) => ({ id: x.id, ...x.summary })) };
  },
  update: async ({
    id,
    resource,
    summary,
  }: {
    id: string;
    resource: any;
    summary: any;
  }) => {
    const list = JSON.parse(
      localStorage.getItem("TEST_GtdTodoAPI_LIST") ?? "[]"
    );

    const index = list.findIndex((x: any) => x.id === id);

    if (index !== -1) {
      list[index] = {
        ...list[index],
        resource: {
          ...list[index].resource,
          ...resource,
        },
        summary: {
          ...list[index].summary,
          ...summary,
        },
      };
    }

    localStorage.setItem("TEST_GtdTodoAPI_LIST", JSON.stringify(list));

    return;
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
