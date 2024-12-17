import { NextResponse } from "next/server";

const redirects = {
  "/introduction/getting-started": "/introduction/what-is-bruno",
  "/license-management/license-management": "/license-management/overview",

  "/testing/assertions": "/testing/tests/assertions",

  "/scripting/request/request-object": "/testing/script/request/request-object",

  "/scripting/response/response-object":
    "/testing/script/response/response-object",

  "/scripting/whitelisting-modules": "/testing/script/whitelisting-modules",
  "/license-management/golden-edition/individual/activate-license":
    "/license-management/overview",
};

export function middleware(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (redirects[path]) {
    url.pathname = redirects[path];
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: Object.keys(redirects),
};
