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

  it("persists only the tokens and the remember choice", () => {
    useAuthStore.getState().handleRegisterUserData("password", "secret");
    useAuthStore.getState().setAuthentication("access", "refresh", true);

    const { state } = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    expect(state).toEqual({
      token: "access",
      refreshToken: "refresh",
      rememberMe: true,
    });
  });

  it("restores the session and derives isAuth from the token on reload", async () => {
    useAuthStore.setState({ isAuth: false, token: undefined });
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        state: { token: "access", refreshToken: "refresh", rememberMe: false },
        version: 0,
      }),
    );

    await useAuthStore.persist.rehydrate();

    expect(useAuthStore.getState()).toMatchObject({
      isAuth: true,
      token: "access",
      refreshToken: "refresh",
      rememberMe: false,
    });
  });

  it("clears the token from localStorage and the cookie on logout", () => {
    useAuthStore.getState().setAuthentication("access", "refresh", true);
    useAuthStore.getState().clearAuthentication();

    expect(localStorage.getItem(KEY)).toBeNull();
    expect(sessionStorage.getItem(KEY)).not.toContain("access");
    expect(hasSessionCookie()).toBe(false);
  });
});
