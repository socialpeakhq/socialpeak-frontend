import {
  QueryClient,
  dehydrate,
  hydrate,
  QueryKey,
} from "@tanstack/react-query";

export const AUTH_QUERY_KEY: QueryKey = ["auth"];

const AUTH_QUERY_CACHE_KEY = "react-query-auth";

export function restoreAuthQuery(queryClient: QueryClient) {
  if (typeof window === "undefined") {
    return;
  }

  const persistedState = window.sessionStorage.getItem(AUTH_QUERY_CACHE_KEY);
  if (!persistedState) {
    return;
  }

  try {
    hydrate(queryClient, JSON.parse(persistedState));
  } catch {
    window.sessionStorage.removeItem(AUTH_QUERY_CACHE_KEY);
  }
}

export function persistAuthQuery(queryClient: QueryClient) {
  if (typeof window === "undefined") {
    return;
  }

  const authQuery = queryClient
    .getQueryCache()
    .find({ queryKey: AUTH_QUERY_KEY });

  if (!authQuery?.state.data) {
    window.sessionStorage.removeItem(AUTH_QUERY_CACHE_KEY);
    return;
  }

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      JSON.stringify(query.queryKey) === JSON.stringify(AUTH_QUERY_KEY),
  });

  window.sessionStorage.setItem(
    AUTH_QUERY_CACHE_KEY,
    JSON.stringify(dehydratedState),
  );
}
