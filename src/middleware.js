import { NextResponse } from "next/server";

const redirects = {
  // Introduction links:

  "/introduction": "/introduction/what-is-bruno",

  "/introduction/getting-started": "/introduction/what-is-bruno",

  "/introduction/support": "/introduction/feedback-community",

  "/manifesto.html": "/introduction/manifesto",

  "/manifesto": "/introduction/manifesto",

  // - /get-started links:

  "/tools/translator": "/get-started/import-export-data/script-translator",

  "/migration-imports/postman":
    "/get-started/import-export-data/postman-migration",

  "/migration-imports/introduction":
    "/get-started/import-export-data/import-collections",

  "/get-started/import-export-data/safe-mode":
    "/get-started/javascript-sandbox",

  // - /git-integration links:

  "/git-integration/using-gui": "/git-integration/using-gui/intro",

  // - /Scripting and Testing links - Tests and Script:

  "/scripting/request/request-object": "/testing/script/request/request-object",

  "/scripting/response/response-object":
    "/testing/script/response/response-object",

  "/scripting/whitelisting-modules": "/testing/script/whitelisting-modules",

  "/scripting/request/sync-requests": "/testing/script/request/sync-requests",

  "/scripting/vars.html": "/testing/script/vars",

  "/scripting/vars": "/testing/script/vars",

  "/scripting/getting-started": "/testing/script/getting-started",

  "/scripting/javascript-reference": "/testing/script/javascript-reference",

  "/scripting/inbuilt-libraries": "/testing/script/inbuilt-libraries",

  "/scripting/external-libraries": "/testing/script/external-libraries",

  "/scripting/introduction": "/testing/script/getting-started",

  "/scripting/sync-requests": "/testing/script/request/sync-requests",

  "/scripting/response-query": "/testing/script/response/response-query",

  "/scripting/response/response-query":
    "/testing/script/response/response-query",

  "/scripting/javascript-reference.html":
    "/testing/script/javascript-reference",

  "/scripting/inbuilt-libraries.html": "/testing/script/inbuilt-libraries",

  "/scripting/external-libraries.html": "/testing/script/external-libraries",

  "/scripting/introduction.html": "/testing/script/getting-started",

  "/scripting/sync-requests.html": "/testing/script/request/sync-requests",

  "/scripting/response-query.html": "/testing/script/response/response-query",

  // - / Testing links - Tests and Script:

  "/testing/introduction.html": "/testing/tests/introduction",

  "/testing/assertions": "/testing/tests/assertions",

  "/testing/introduction": "/testing/tests/introduction",

  "/testing/javascript-reference": "/testing/script/javascript-reference",

  "/testing/assertions.html": "/testing/tests/assertions",

  "/testing/javascript-reference.html": "/testing/script/javascript-reference",

  // - /license

  "/license-management/license-management": "/license-management/overview",

  "/license-management/golden-edition/individual/activate-license":
    "/license-management/overview",

  "/license-management/organization/manage-licenses":
    "/license-management/overview",

  "/license-management/organization/activate-license":
    "/license-management/overview",

  // - /bru-cli

  "/cli/overview": "/bru-cli/overview",

  "/cli/overview.html": "/bru-cli/overview",

  // - /bru-language

  "/bru-language-tag-reference": "/bru-lang/tag-reference",

  "/bru-language-design": "/bru-lang/language",

  "/bru-lang-overview": "/bru-lang/overview",

  "/bru-lang-extensions": "/bru-lang/syntax-highlighting",

  "/bru-language-samples.html": "/bru-lang/samples",

  "/bru-language-samples": "/bru-lang/samples",

  "/bru-language-tag-reference.html": "/bru-lang/tag-reference",

  "/bru-language-design.html": "/bru-language-design",
  "/bru-lang-overview.html": "/bru-lang-overview",
  "/bru-lang-extensions.html": "/bru-lang/syntax-highlighting",

  // Share Collection
  "/to/embed-bruno-collection": "/git-integration/embed-bruno-collection",
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
  matcher: [
    '/introduction/:path*',
    '/tools/:path*',
    '/migration-imports/:path*',
    '/get-started/:path*',
    '/git-integration/:path*',
    '/scripting/:path*',
    '/testing/:path*',
    '/license-management/:path*',
    '/cli/:path*',
    '/bru-language/:path*',
    '/bru-lang/:path*'
  ]
};
