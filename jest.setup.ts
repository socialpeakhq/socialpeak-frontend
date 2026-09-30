import "@testing-library/jest-dom/jest-globals";
import { jest } from "@jest/globals";

// App Router hooks throw outside a mounted Next router. useRouter() returns the
// same object every call, so tests can assert on it: expect(useRouter().push)...
jest.mock("next/navigation", () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  };

  return {
    ...jest.requireActual<typeof import("next/navigation")>("next/navigation"),
    useRouter: () => router,
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
  };
});
