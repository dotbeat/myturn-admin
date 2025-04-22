import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// 環境変数からGraphQLエンドポイントを取得、デフォルトはローカル開発用
export const apiUrl =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:8000/graphql";

// WebSocketのURLを構築（HTTPSの場合はWSSを使用）
const wsUrl = apiUrl.replace(/^http/, "ws");

const httpLink = createHttpLink({
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
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// リクエストタイプに基づいてリンクを分割
// クエリとミューテーションはHTTP、サブスクリプションはWebSocketを使用
const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
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
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});
