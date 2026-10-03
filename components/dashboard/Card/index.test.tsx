import { act, render, screen } from "@testing-library/react";
import Card from "./index";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { MetaPlatformInsight } from "@/react-query/connections/connections.type";

function makeInsight(overrides: Partial<MetaPlatformInsight> = {}) {
  return {
    id: 1,
    facebook_page_id: 1,
    platform: "instagram",
    metric: "profile_views",
    value: 42,
    captured_at: new Date(),
    ...overrides,
  };
}

describe("Card", () => {
  afterEach(() => {
    // The store is a real singleton, not a fresh instance per test — without
    // resetting it, selectedPlatform changed in one test would leak into the next.
    // act() because mountStoreDevtool() in useWorkspaceStore.ts mounts its own
    // React root that also re-renders on every setState, outside RTL's render cycle.
    act(() => {
      useWorkspaceStore.setState({ selectedPlatform: "instagram" });
    });
  });

  it("renders the metric value and a human-readable label", () => {
    render(<Card data={makeInsight({ metric: "profile_views", value: 42 })} />);

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/Profile Views/)).toBeInTheDocument();
  });

  it("renders the matching icon for a known instagram metric", () => {
    render(<Card data={makeInsight({ metric: "likes" })} />);

    expect(document.querySelector("svg")).not.toBeNull();
  });

  it("renders no icon when the selected platform has no icon mapping", () => {
    act(() => {
      useWorkspaceStore.setState({ selectedPlatform: "facebook" });
    });

    render(<Card data={makeInsight({ metric: "likes" })} />);

    expect(document.querySelector("svg")).toBeNull();
  });
});
