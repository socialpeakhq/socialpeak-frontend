import usePostStore, {
  EMPTY_POST_DATA,
  PostData,
  PostMediaItem,
  PostPlatform,
  PostType,
} from "@/stores/usePostStore";
import { afterEach, describe, expect, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import PostNotices from ".";
import { needsLetterbox } from "../constants";

function makePostData(overrides: Partial<PostData> = {}) {
  return {
    type: "post" as PostType,
    platforms: ["facebook", "instagram"] as PostPlatform[],
    caption: "",
    title: "",
    link: "",
    media: [] as PostMediaItem[],
    scheduled: false,
    scheduleTime: null,
    ...overrides,
  };
}

afterEach(() => {
  act(() => {
    usePostStore.setState({ createPostData: EMPTY_POST_DATA });
  });
});

describe("PostNotices", () => {
  it("Shows Instagram-need-media warning when posting to Instagram with no media", () => {
    act(() => {
      usePostStore.setState({
        createPostData: makePostData({
          type: "post",
          platforms: ["instagram"],
          media: [],
        }),
      });
    });

    render(<PostNotices />);
    expect(screen.getByText(/requires at least one photo/)).toBeInTheDocument();
  });

  it("Doesn't show the Instagram-need-media warning when posting to Instagram", () => {
    act(() => {
      usePostStore.setState({
        createPostData: makePostData({
          type: "post",
          media: [
            {
              url: "random url",
              height: 1920,
              width: 1080,
              id: "random id",
              kind: "image",
            },
          ],
        }),
      });
    });
    render(<PostNotices />);
    expect(screen.queryByText(/requires at least one photo/)).toBeNull();
  });

  it("Shows Instagram-only warning when posting video story on both platforms", () => {
    act(() => {
      usePostStore.setState({
        createPostData: makePostData({
          type: "story",
          media: [
            {
              url: "random url",
              height: 1000,
              width: 1000,
              id: "random id",
              kind: "video",
            },
          ],
        }),
      });
    });
    render(<PostNotices />);
    expect(
      screen.getByText(
        "Facebook only supports photo Stories today, so this will publish to Instagram only.",
      ),
    ).toBeInTheDocument();
  });

  it("Shows out of range image warning when one or more images fall out of 4:4 - 1.91:1 range", () => {
    act(() => {
      usePostStore.setState({
        createPostData: makePostData({
          media: [
            {
              url: "random url",
              height: 1000,
              width: 1000,
              id: "random id",
              kind: "image",
            },
          ],
        }),
      });
    });

    expect(needsLetterbox(1000, 1000)).toBe(false);
    render(<PostNotices />);
    expect(
      screen.getByText(
        "One or more images fall outside the 4:5–1.91:1 range — they'll be padded automatically, not cropped or rejected.",
      ),
    ).toBeInTheDocument();
  });
});
