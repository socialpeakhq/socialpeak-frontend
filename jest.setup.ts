import "@testing-library/jest-dom/jest-globals";
import { jest } from "@jest/globals";
import { TextDecoder, TextEncoder } from "util";
import { ReadableStream, TransformStream, WritableStream } from "stream/web";
import { BroadcastChannel, MessagePort } from "worker_threads";
import { clearImmediate, setImmediate } from "timers";

// jsdom doesn't expose these globally, but msw's request interceptors need them.
Object.assign(global, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
  BroadcastChannel,
  MessagePort,
  setImmediate,
  clearImmediate,
});

// Deliberately `require` (not a static `import`) here: imports are hoisted
// above this whole file, so a static import of undici would run before the
// Object.assign above, and undici reads global.TextDecoder as soon as it
// loads. fetch/Headers/Request/Response come from `undici` rather than the
// old `whatwg-fetch` polyfill because msw needs a spec-current Headers
// implementation — whatwg-fetch's is missing getSetCookie().
const { fetch, Headers, Request, Response } = require("undici");
Object.assign(global, { fetch, Headers, Request, Response });

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
