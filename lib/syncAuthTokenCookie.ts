import { AUTH_TOKEN_COOKIE_NAME } from "./authCookieName";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Keeps a readable cookie in sync with the persisted auth token so Next.js
 * middleware can protect `/app` on full navigations and refreshes.
 */
export function syncAuthTokenCookie(token: string | undefined) {
  if (typeof window === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  if (token) {
    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  } else {
    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  }
}
