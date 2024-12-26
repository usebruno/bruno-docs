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

  "/testing/introduction": "/testing/tests/introduction",

  "/scripting/request/sync-requests": "/testing/script/request/sync-requests",

  "/scripting/vars.html": "/testing/script/vars",

  "/scripting/vars": "/testing/script/vars",

  "/tools/translator": "/get-started/import-export-data/script-translator",

  "/bru-language-samples": "/bru-lang/samples",

  "/scripting/getting-started": "/testing/script/getting-started",

  "/git-integration/using-gui": "/git-integration/using-gui/intro",

  "/scripting/javascript-reference": "/testing/script/javascript-reference",

  "/cli/overview": "/bru-cli/overview",

  "/secrets-management/overview": "/secrets-management/overview",

  "/scripting/inbuilt-libraries": "/testing/script/inbuilt-libraries",

  "/scripting/external-libraries": "/testing/script/external-libraries",

  "/bru-language-tag-reference": "/bru-lang/tag-reference",

  "/secrets-management/secret-variables":
    "/secrets-management/secret-variables",

  "/testing/assertions": "/testing/tests/assertions",

  "/testing/javascript-reference": "/testing/script/javascript-reference",

  "/testing/javascript-reference": "/testing/script/javascript-reference",

  "/bru-language-design": "/bru-lang/language",

  "/secrets-management/dotenv-file": "/secrets-management/dotenv-file",

  "/bru-lang-overview": "/bru-lang/overview",

  "/scripting/introduction": "/testing/script/getting-started",

  "/migration-imports/postman":
    "/get-started/import-export-data/postman-migration",

  "/migration-imports/introduction":
    "/get-started/import-export-data/import-collections",

  "/testing/introduction": "/testing/tests/introduction",

  "/scripting/sync-requests": "/testing/script/request/sync-requests",

  "/scripting/response-query": "/testing/script/response/response-query",

  "/scripting/response/response-query":
    "/testing/script/response/response-query",

  "/bru-lang-extensions": "/bru-lang/syntax-highlighting",

  "/get-started/import-export-data/safe-mode":
    "/get-started/javascript-sandbox",

  "/introduction/support": "/introduction/feedback-community",

  "/introduction": "/introduction/what-is-bruno",

  "/license-management/organization/manage-licenses":
    "/license-management/overview",

  "/license-management/organization/activate-license":
    "/license-management/overview",

  "/manifesto": "/introduction/manifesto",
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
