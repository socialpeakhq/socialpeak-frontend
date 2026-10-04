"use client";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AUTH_QUERY_KEY,
  persistAuthQuery,
  restoreAuthQuery,
} from "@/lib/authQueryPersistence";
import {
  META_ACCOUNTS_QUERY_KEY,
  persistMetaAccountsQuery,
  restoreMetaAccountsQuery,
} from "@/lib/metaAccountsQueryPersistence";
import { Global as RechartsGlobal } from "recharts";

RechartsGlobal.devToolsEnabled = false;

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-body)",
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient();
    client.setQueryDefaults(AUTH_QUERY_KEY, {
      gcTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
    });
    client.setQueryDefaults(META_ACCOUNTS_QUERY_KEY, {
      gcTime: Number.POSITIVE_INFINITY,
      staleTime: Number.POSITIVE_INFINITY,
    });
    return client;
  });

  useEffect(() => {
    restoreAuthQuery(queryClient);
    persistAuthQuery(queryClient);
    restoreMetaAccountsQuery(queryClient);
    persistMetaAccountsQuery(queryClient);

    return queryClient.getQueryCache().subscribe(() => {
      persistAuthQuery(queryClient);
      persistMetaAccountsQuery(queryClient);
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
