import { QueryClient } from "@tanstack/react-query";
import {
  AUTH_QUERY_KEY,
  persistAuthQuery,
  restoreAuthQuery,
} from "./authQueryPersistence";
import { beforeEach, describe, expect, it } from "@jest/globals";

const STORAGE_KEY = "react-query-auth";

describe("authQueryPersistence", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("persists the auth query to sessionStorage", () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(AUTH_QUERY_KEY, { userId: 1 });

    persistAuthQuery(queryClient);

    expect(sessionStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it("removes the persisted entry when there is no auth data (e.g. logout)", () => {
    sessionStorage.setItem(STORAGE_KEY, "some-stale-value");
    const queryClient = new QueryClient();

    persistAuthQuery(queryClient);

    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("survives a reload: data saved by one client is readable by a fresh one", () => {
    const clientBeforeReload = new QueryClient();
    clientBeforeReload.setQueryData(AUTH_QUERY_KEY, {
      userId: 42,
      name: "Elson",
    });
    persistAuthQuery(clientBeforeReload);

    // A real reload starts a brand-new app with a brand-new QueryClient —
    // sessionStorage is the only thing that carries over.
    const clientAfterReload = new QueryClient();
    restoreAuthQuery(clientAfterReload);

    expect(clientAfterReload.getQueryData(AUTH_QUERY_KEY)).toEqual({
      userId: 42,
      name: "Elson",
    });
  });

  it("ignores and cleans up a corrupted entry instead of throwing", () => {
    sessionStorage.setItem(STORAGE_KEY, "{not valid json");
    const queryClient = new QueryClient();

    expect(() => restoreAuthQuery(queryClient)).not.toThrow();
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("does nothing when there is nothing persisted", () => {
    const queryClient = new QueryClient();

    restoreAuthQuery(queryClient);

    expect(queryClient.getQueryData(AUTH_QUERY_KEY)).toBeUndefined();
  });
});
