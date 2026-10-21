import { NextRequest, NextResponse } from "next/server";

// APIが発行する管理者用のセッションCookie（検証はAPI側で行う）
const ADMIN_SESSION_COOKIE = "admin-jwt";

export function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!isLoginPage && !req.cookies.has(ADMIN_SESSION_COOKIE)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 静的ファイルを除くすべてのルートに対して認証を適用
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|apple-touch-icon.png|assets).*)",
  ],
};
