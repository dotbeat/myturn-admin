import { Metadata } from "next";
import { Suspense } from "react";
import PageBody from "./PageBody";

export const metadata: Metadata = {
  title: "人気の求人 - myturn管理",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
        </div>
      }
    >
      <PageBody />
    </Suspense>
  );
}
