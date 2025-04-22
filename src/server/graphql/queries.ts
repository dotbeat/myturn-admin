import { DocumentNode } from "graphql";
import { OperationVariables } from "@apollo/client";
import { createApolloClient } from "./client";

/**
 * サーバーサイドでGraphQLクエリを実行するためのユーティリティ関数
 * @param query GraphQLクエリ
 * @param variables クエリ変数
 * @returns クエリ結果
 */
export async function serverQuery<
  T = any,
  V extends OperationVariables = OperationVariables,
>(query: DocumentNode, variables?: V): Promise<T> {
  try {
    const client = await createApolloClient();
    const { data } = await client.query({
      query,
      variables,
    });
    return data as T;
  } catch (error) {
    console.error("Server GraphQL query error:", error);
    throw error;
  }
}
