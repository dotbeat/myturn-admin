"use client";
import { useCallback, useRef, useState } from "react";
import Script from "next/script";
import { useMutation } from "@apollo/client/react";
import { Box, Typography } from "@mui/material";
import { AdminLoginWithGoogleMutation } from "@/graphql-client";
import { ADMIN_LOGIN_WITH_GOOGLE } from "@/server/graphql/admin-user/mutations";
import { Logo } from "@/icons/logo";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function PageBody() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const [loginWithGoogle, { loading }] =
    useMutation<AdminLoginWithGoogleMutation>(ADMIN_LOGIN_WITH_GOOGLE, {
      onCompleted() {
        // ログイン前に取得した情報を残さないよう、画面ごと読み込み直す
        window.location.assign("/");
      },
      onError(err) {
        setError(err.message || "ログインに失敗しました");
      },
    });

  // Google Identity Servicesの読み込み完了後にログインボタンを表示する
  const renderGoogleButton = useCallback(() => {
    if (!window.google || !buttonRef.current) return;
    if (!googleClientId) {
      setError("Google Identity Servicesの設定が登録されていません");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: ({ credential }) => {
        setError(null);
        loginWithGoogle({ variables: { input: { idToken: credential } } });
      },
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      text: "signin_with",
      shape: "pill",
      locale: "ja",
      width: 280,
    });
  }, [loginWithGoogle]);

  return (
    <Box className="flex flex-1 items-center justify-center px-4 py-12">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={renderGoogleButton}
      />
      <Box className="flex w-full max-w-md flex-col items-center bg-(--background) px-8 py-10 shadow-xs">
        <Box className="mb-8 flex items-center gap-1 text-(--myturn-main-text)">
          <Logo width={109} />
          <Typography className="text-lg font-semibold">管理</Typography>
        </Box>
        <Typography className="mb-8 text-center text-sm">
          許可されたGoogleアカウントでログインしてください
        </Typography>
        <Box ref={buttonRef} className="flex h-11 justify-center" />
        {loading && (
          <Typography className="mt-4 text-sm text-(--myturn-sub-text)">
            ログインしています...
          </Typography>
        )}
        {error && (
          <Typography className="mt-4 text-center text-sm text-(--myturn-accent)">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
