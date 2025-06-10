import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ApolloProvider } from "@/lib/ApolloProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "myturn管理",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ApolloProvider>{children}</ApolloProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
