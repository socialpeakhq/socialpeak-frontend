import { beforeEach, describe, expect, it } from "@jest/globals";
import { createRememberAwareStorage } from "./authStorage";

const KEY = "auth";
const persisted = (rememberMe: boolean) =>
  JSON.stringify({ state: { token: "abc", rememberMe }, version: 0 });

describe("createRememberAwareStorage", () => {
  const storage = createRememberAwareStorage(localStorage, sessionStorage);

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("writes remembered sessions to localStorage only", () => {
    storage.setItem(KEY, persisted(true));

    expect(localStorage.getItem(KEY)).toBe(persisted(true));
    expect(sessionStorage.getItem(KEY)).toBeNull();
  });

  it("writes non-remembered sessions to sessionStorage only", () => {
    storage.setItem(KEY, persisted(false));

    expect(sessionStorage.getItem(KEY)).toBe(persisted(false));
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("moves the entry when the remember choice changes (e.g. logout)", () => {
    storage.setItem(KEY, persisted(true));
    storage.setItem(KEY, persisted(false));

    expect(localStorage.getItem(KEY)).toBeNull();
    expect(sessionStorage.getItem(KEY)).toBe(persisted(false));
  });

  it("reads from whichever storage holds the entry", () => {
    sessionStorage.setItem(KEY, persisted(false));
    expect(storage.getItem(KEY)).toBe(persisted(false));

    sessionStorage.clear();
    localStorage.setItem(KEY, persisted(true));
    expect(storage.getItem(KEY)).toBe(persisted(true));
  });

  it("removes the entry from both storages", () => {
    localStorage.setItem(KEY, "x");
    sessionStorage.setItem(KEY, "x");

    storage.removeItem(KEY);

    expect(localStorage.getItem(KEY)).toBeNull();
    expect(sessionStorage.getItem(KEY)).toBeNull();
  });
});
