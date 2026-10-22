"use client";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { client } from "./apolloClient";
import { ReactNode } from "react";

interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
