import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { OperationTypeNode } from "graphql";
import { createClient } from "graphql-ws";

// 環境変数からGraphQLエンドポイントを取得、デフォルトはローカル開発用
export const apiUrl =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:8000/graphql";

// WebSocketのURLを構築（HTTPSの場合はWSSを使用）
const wsUrl = apiUrl.replace(/^http/, "ws");

const httpLink = new HttpLink({
  uri: apiUrl,
  credentials: "include",
});

// WebSocket接続の設定
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: wsUrl,
          connectionParams: {
            // 認証情報などが必要な場合はここに追加
          },
        }),
      )
    : null;

// エラーハンドリングの設定
const errorLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    console.error(`[Network error]: ${error}`);
    return;
  }

  error.errors.forEach(({ message, locations, path }) =>
    console.error(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ),
  );

  // 未ログイン・セッション切れ・許可メールアドレスから削除された場合はログイン画面へ遷移する
  const isUnauthorized = error.errors.some(
    ({ extensions }) => extensions?.code === "UNAUTHORIZED",
  );
  if (
    isUnauthorized &&
    typeof window !== "undefined" &&
    window.location.pathname !== "/login"
  ) {
    window.location.assign("/login");
  }
});

// リクエストタイプに基づいてリンクを分割
// クエリとミューテーションはHTTP、サブスクリプションはWebSocketを使用
const splitLink =
  typeof window !== "undefined" && wsLink
    ? ApolloLink.split(
        ({ operationType }) => operationType === OperationTypeNode.SUBSCRIPTION,
        wsLink,
        errorLink.concat(httpLink),
      )
    : errorLink.concat(httpLink);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      // Apollo Client 4で既定値がtrueになったため、refetch中にloadingにならない従来の挙動を維持する
      notifyOnNetworkStatusChange: false,
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});
