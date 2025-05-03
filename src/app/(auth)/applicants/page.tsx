import { Metadata } from "next";
import { Suspense } from "react";
import PageBody from "./PageBody";

export const metadata: Metadata = {
  title: "応募者 - myturn管理",
};

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <PageBody />
    </Suspense>
  );
}
