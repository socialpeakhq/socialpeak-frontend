import { beforeEach, describe, expect, it } from "@jest/globals";
import useAuthStore from "./useAuthStore";

const KEY = "auth";
const hasSessionCookie = () => document.cookie.includes("sp_session=1");

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.getState().clearAuthentication();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("keeps a remembered login in localStorage", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", true);

    expect(localStorage.getItem(KEY)).toContain('"token":"access"');
    expect(sessionStorage.getItem(KEY)).toBeNull();
    expect(hasSessionCookie()).toBe(true);
  });

  it("keeps a non-remembered login in sessionStorage", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", false);

    expect(sessionStorage.getItem(KEY)).toContain('"token":"access"');
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(hasSessionCookie()).toBe(true);
  });

  it("keeps the remember choice when the token is refreshed", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", true);
    useAuthStore.getState().setAuthentication("new-access", "new-refresh");

    expect(useAuthStore.getState().rememberMe).toBe(true);
    expect(localStorage.getItem(KEY)).toContain('"token":"new-access"');
  });

  it("never puts the token in the cookie", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", true);

    expect(document.cookie).not.toContain("access");
  });

  it("clears the token from localStorage and the cookie on logout", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", true);
    useAuthStore.getState().clearAuthentication();

    expect(localStorage.getItem(KEY)).toBeNull();
    expect(sessionStorage.getItem(KEY)).not.toContain("access");
    expect(hasSessionCookie()).toBe(false);
  });
});
