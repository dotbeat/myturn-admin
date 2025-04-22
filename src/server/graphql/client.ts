import { headers } from "next/headers";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { apiUrl } from "@/lib/apolloClient";

export const createApolloClient = async () => {
  const httpLink = createHttpLink({ uri: apiUrl, credentials: "include" });

  // Next.jsのheadersを取得
  const headersList = await headers();
  // cookieを取得（型エラーを回避するためにtry-catchを使用）
  let cookie = "";
  try {
    cookie = headersList.get("cookie") || "";
  } catch (error) {
    console.error("Failed to get cookie from headers:", error);
  }

  // 認証情報をヘッダーに追加
  const authLink = setContext(
    (_: unknown, { headers }: { headers?: Record<string, string> }) => ({
      headers: {
        ...headers,
        ...(cookie ? { cookie } : {}),
      },
    }),
  );

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  });
};
