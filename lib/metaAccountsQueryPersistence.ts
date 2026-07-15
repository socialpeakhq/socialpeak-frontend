import {
  QueryClient,
  dehydrate,
  hydrate,
  QueryKey,
} from "@tanstack/react-query";

export const META_ACCOUNTS_QUERY_KEY: QueryKey = ["meta-accounts"];

const META_ACCOUNTS_QUERY_CACHE_KEY = "react-query-meta-accounts";

export function restoreMetaAccountsQuery(queryClient: QueryClient) {
  if (typeof window === "undefined") {
    return;
  }

  const persistedState = window.sessionStorage.getItem(
    META_ACCOUNTS_QUERY_CACHE_KEY,
  );
  if (!persistedState) {
    return;
  }

  try {
    hydrate(queryClient, JSON.parse(persistedState));
  } catch {
    window.sessionStorage.removeItem(META_ACCOUNTS_QUERY_CACHE_KEY);
  }
}

export function persistMetaAccountsQuery(queryClient: QueryClient) {
  if (typeof window === "undefined") {
    return;
  }

  const metaAccountsQuery = queryClient
    .getQueryCache()
    .find({ queryKey: META_ACCOUNTS_QUERY_KEY });

  if (!metaAccountsQuery?.state.data) {
    window.sessionStorage.removeItem(META_ACCOUNTS_QUERY_CACHE_KEY);
    return;
  }

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: (query) =>
      JSON.stringify(query.queryKey) === JSON.stringify(META_ACCOUNTS_QUERY_KEY),
  });

  window.sessionStorage.setItem(
    META_ACCOUNTS_QUERY_CACHE_KEY,
    JSON.stringify(dehydratedState),
  );
}
