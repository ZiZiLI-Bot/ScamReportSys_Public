import { isRouterMatch, userRouters } from "@/lib/AuthConfig/AuthRouter.config";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

type TokenPayload = {
  _id: string;
  email: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
};

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const token = getCookie("token", { res, req });
  const { nextUrl } = req;
  if (token) {
    try {
      const payload = jwtDecode<TokenPayload>(token);
      const { role } = payload;
      if (role === "user" && nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL(`/`, req.url));
      }
      return res;
    } catch (error) {
      console.error("Error decoding token", error);
      deleteCookie("token", { res, req });
      return res;
    }
  } else {
    if (isRouterMatch(nextUrl.pathname, userRouters)) {
      return NextResponse.redirect(new URL(`/auth/login?redirect=${nextUrl.pathname}`, req.url));
    } else if (nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL(`/`, req.url));
    }
  }
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
