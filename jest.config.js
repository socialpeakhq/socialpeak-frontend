import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
  moduleNameMapper: {
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgMock.tsx",
  },
};

export default async () => {
  const baseConfig = await createJestConfig(config)();

  return {
    ...baseConfig,
    // next/jest's own ignore patterns match virtually all of node_modules,
    // which would otherwise win over any pattern we append (Jest ignores a
    // file if ANY pattern matches). msw pulls in a deep tree of ESM-only
    // transitive deps (@mswjs/*, @open-draft/*, rettime, ...) that keeps
    // growing, so rather than naming each one, transform all of node_modules
    // and keep only the one exclusion that actually matters: compiled CSS
    // modules, which aren't valid JS and must stay untouched.
    transformIgnorePatterns: baseConfig.transformIgnorePatterns.filter(
      (pattern) => !pattern.startsWith("/node_modules/"),
    ),
  };
};
