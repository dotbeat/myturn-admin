import { Metadata } from "next";
import PageBody from "./PageBody";

export const metadata: Metadata = {
  title: "応募者 - myturn管理",
};

export default function Page() {
  return <PageBody />;
}
