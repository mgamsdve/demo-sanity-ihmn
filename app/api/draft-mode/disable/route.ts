import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

function getRedirectTarget(request: Request) {
  const redirectTo = new URL(request.url).searchParams.get("redirect");

  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/";
  }

  return redirectTo;
}

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();
  redirect(getRedirectTarget(request));
}
