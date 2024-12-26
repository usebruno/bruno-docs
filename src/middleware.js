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

  "/bru-language-samples.html": "/bru-lang/samples",

  "/scripting/getting-started": "/testing/script/getting-started",

  "/git-integration/using-gui": "/git-integration/using-gui/intro",

  "/scripting/javascript-reference.html":
    "/testing/script/javascript-reference",

  "/cli/overview.html": "/bru-cli/overview",

  "/secrets-management/overview.html": "/secrets-management/overview",

  "/scripting/inbuilt-libraries.html": "/testing/script/inbuilt-libraries",

  "/scripting/external-libraries.html": "/testing/script/external-libraries",

  "/bru-language-tag-reference.html": "/bru-lang/tag-reference",

  "/secrets-management/secret-variables.html":
    "/secrets-management/secret-variables",

  "/testing/assertions.html": "/testing/tests/assertions",

  "/testing/javascript-reference.html": "/testing/script/javascript-reference",

  "/testing/javascript-reference": "/testing/script/javascript-reference",

  "/bru-language-design.html": "/bru-lang/language",

  "/secrets-management/dotenv-file.html": "/secrets-management/dotenv-file",

  "/bru-lang-overview.html": "/bru-lang/overview",

  "/scripting/introduction.html": "/testing/script/getting-started",

  "/migration-imports/postman":
    "/get-started/import-export-data/postman-migration",

  "/migration-imports/introduction":
    "/get-started/import-export-data/import-collections",

  "/testing/introduction.html": "/testing/tests/introduction",

  "/scripting/sync-requests.html": "/testing/script/request/sync-requests",

  "/scripting/response-query.html": "/testing/script/response/response-query",

  "/bru-lang-extensions.html": "/bru-lang/syntax-highlighting",

  "/get-started/import-export-data/safe-mode":
    "/get-started/javascript-sandbox",

  "/introduction/support": "/introduction/feedback-community",

  "/introduction": "/introduction/what-is-bruno",

  "/license-management/organization/manage-licenses":
    "/license-management/overview",

  "/license-management/organization/activate-license":
    "/license-management/overview",

  "/manifesto.html": "/introduction/manifesto",
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
