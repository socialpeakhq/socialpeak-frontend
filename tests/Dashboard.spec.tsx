import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { act } from "@testing-library/react";
import { render, waitFor } from "@/utils/test-utils";
import Container from "@/pages/dashboard/Container";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

const insightsHandler = jest.fn(() => HttpResponse.json([]));

// Must match the full origin APIClient actually requests against (axios's
// baseURL = NEXT_PUBLIC_BACKEND_API, see .env) — a path-only pattern
// resolves against jsdom's default origin (http://localhost), not this
// one, and silently never matches.
const server = setupServer(
  http.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}meta-insights/workspace/:workspace_id/:platform`,
    insightsHandler,
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  insightsHandler.mockClear();
  // Reset the real (singleton) store so state set in one test doesn't leak
  // into the next. act() because the store's devtools mount their own React
  // root that also re-renders on setState, outside RTL's tracked render cycle.
  act(() => {
    useWorkspaceStore.setState({
      selectedWorkspace: undefined,
      selectedPlatform: "instagram",
    });
  });
});

describe("Single Platform Insights", () => {
  describe("Workspace ID does not exist", () => {
    beforeEach(() => {
      act(() => {
        useWorkspaceStore.setState({ selectedWorkspace: undefined });
      });
    });

    it("does not call the insights API", () => {
      render(<Container />);
      expect(insightsHandler).not.toHaveBeenCalled();
    });
  });

  describe("Workspace ID and platform both exist", () => {
    beforeEach(() => {
      act(() => {
        useWorkspaceStore.setState({
          selectedWorkspace: {
            workspace_id: 5,
            owner_id: 1,
            workspace_name: "Test workspace",
            created_at: new Date().toISOString(),
            connected_accounts: ["instagram"],
          },
          selectedPlatform: "instagram",
        });
      });
    });

    it("calls the insights API with the selected workspace and platform", async () => {
      render(<Container />);

      // Unlike the disabled case, this goes through a real (mocked) network
      // round trip, so the call happens on a later microtask — we have to
      // wait for it instead of asserting immediately after render.
      await waitFor(() => expect(insightsHandler).toHaveBeenCalled());

      // MSW parses :workspace_id out of the URL path, so it always arrives
      // as a string here even though the hook was called with a number.
      expect(insightsHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { workspace_id: "5", platform: "instagram" },
        }),
      );
    });

    it("renders the data the API responds with", async () => {
      insightsHandler.mockImplementationOnce(() =>
        HttpResponse.json({
          data: [
            {
              id: 1,
              facebook_page_id: 1,
              platform: "instagram",
              metric: "likes",
              value: 42,
              captured_at: new Date().toISOString(),
            },
          ],
        }),
      );

      const { queryClient } = render(<Container />);

      await waitFor(() =>
        expect(queryClient.getQueryData(["insights", 5, "instagram"])).toEqual([
          {
            id: 1,
            facebook_page_id: 1,
            platform: "instagram",
            metric: "likes",
            value: 42,
            captured_at: expect.any(String),
          },
        ]),
      );
    });
  });
});
