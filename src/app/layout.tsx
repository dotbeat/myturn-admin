import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myturn 管理画面",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex min-h-dvh flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
