import { AUTH_SESSION_COOKIE_NAME } from "./authCookieName";

const REMEMBER_ME_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// This cookie only tells proxy.ts that a session exists; it never holds the
// token. Remembered sessions get a Max-Age so they outlive the browser,
// otherwise it's a session cookie that goes away when the browser closes.
export function setAuthSessionCookie(rememberMe: boolean) {
  if (typeof window === "undefined") return;

  const maxAge = rememberMe ? `; Max-Age=${REMEMBER_ME_MAX_AGE_SECONDS}` : "";
  document.cookie = `${AUTH_SESSION_COOKIE_NAME}=1; Path=/${maxAge}; SameSite=Lax${secureFlag()}`;
}

export function clearAuthSessionCookie() {
  if (typeof window === "undefined") return;

  document.cookie = `${AUTH_SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secureFlag()}`;
}

function secureFlag() {
  return window.location.protocol === "https:" ? "; Secure" : "";
}
