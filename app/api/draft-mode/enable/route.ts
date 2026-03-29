import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { previewClient } from "@/lib/sanity.preview";

const token = process.env.SANITY_API_READ_TOKEN;
const DRAFT_MODE_MAX_AGE = 60 * 60;
const SECRET_TTL_SECONDS = 3600;
const SECRET_PARAM = "sanity-preview-secret";
const PATHNAME_PARAM = "sanity-preview-pathname";
const PERSPECTIVE_PARAM = "sanity-preview-perspective";
const VERCEL_BYPASS_PARAM = "x-vercel-protection-bypass";
const VERCEL_SET_BYPASS_COOKIE_PARAM = "x-vercel-set-bypass-cookie";
const PERSPECTIVE_COOKIE_NAME = "sanity-preview-perspective";

const fetchValidSecretsQuery = `{
  "private": *[_type == "sanity.previewUrlSecret" && secret == $secret && dateTime(_updatedAt) > dateTime(now()) - ${SECRET_TTL_SECONDS}][0]{
    secret
  },
  "public": *[_id == "sanity-preview-url-secret.share-access" && _type == "sanity.previewUrlShareAccess" && secret == $secret][0]{
    secret
  }
}`;

function parsePreviewRequestUrl(url: string) {
  const requestUrl = new URL(url);
  const secret = requestUrl.searchParams.get(SECRET_PARAM);
  const studioPreviewPerspective = requestUrl.searchParams.get(PERSPECTIVE_PARAM);

  if (!secret) {
    return { isValid: false as const };
  }

  let redirectTo = "/";
  const unsafeRedirectTo = requestUrl.searchParams.get(PATHNAME_PARAM);

  if (unsafeRedirectTo) {
    const redirectUrl = new URL(unsafeRedirectTo, "http://localhost");

    if (studioPreviewPerspective && !redirectUrl.searchParams.has(PERSPECTIVE_PARAM)) {
      redirectUrl.searchParams.set(PERSPECTIVE_PARAM, studioPreviewPerspective);
    }

    const vercelBypass = requestUrl.searchParams.get(VERCEL_BYPASS_PARAM);
    if (vercelBypass) {
      redirectUrl.searchParams.set(VERCEL_BYPASS_PARAM, vercelBypass);
      redirectUrl.searchParams.set(VERCEL_SET_BYPASS_COOKIE_PARAM, "samesitenone");
    }

    redirectTo = `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
  }

  return {
    isValid: true as const,
    redirectTo,
    secret,
    studioPreviewPerspective,
  };
}

export async function GET(request: Request): Promise<Response> {
  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN", { status: 500 });
  }

  const previewParams = parsePreviewRequestUrl(request.url);
  if (!previewParams.isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  const { private: privateSecret, public: publicSecret } =
    await previewClient
      .withConfig({ token, useCdn: false, perspective: "raw", stega: false })
      .fetch<{ private: { secret?: string } | null; public: { secret?: string } | null }>(
        fetchValidSecretsQuery,
        { secret: previewParams.secret },
      );

  const isValid =
    privateSecret?.secret === previewParams.secret ||
    publicSecret?.secret === previewParams.secret;

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();

  if (!draft.isEnabled) {
    draft.enable();
  }

  const dev = process.env.NODE_ENV !== "production";
  const cookieStore = await cookies();
  const bypassCookie = cookieStore.get("__prerender_bypass");

  if (!bypassCookie?.value) {
    return new Response("Failed to set draft mode cookie", { status: 500 });
  }

  cookieStore.set({
    name: "__prerender_bypass",
    value: bypassCookie.value,
    httpOnly: true,
    path: "/",
    secure: !dev,
    sameSite: dev ? "lax" : "none",
    maxAge: DRAFT_MODE_MAX_AGE,
  });

  if (previewParams.studioPreviewPerspective) {
    cookieStore.set({
      name: PERSPECTIVE_COOKIE_NAME,
      value: previewParams.studioPreviewPerspective,
      httpOnly: true,
      path: "/",
      secure: !dev,
      sameSite: dev ? "lax" : "none",
      maxAge: DRAFT_MODE_MAX_AGE,
    });
  }

  return redirect(previewParams.redirectTo) as Promise<Response>;
}
