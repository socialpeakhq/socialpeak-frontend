import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Fresh client per render so cached queries don't leak between tests
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { ...render(ui, { wrapper: Wrapper, ...options }), queryClient };
};

export * from "@testing-library/react";
export { customRender as render };
