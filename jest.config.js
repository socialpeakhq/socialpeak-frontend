import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Reset mock call history (e.g. useRouter().push) between tests
  clearMocks: true,
  moduleNameMapper: {
    // Overrides next/jest's file stub: SVGs are React components via @svgr/webpack
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgMock.tsx",
  },
};

export default createJestConfig(config);
