import { MediaKind, PostPlatform, PostType } from "@/stores/usePostStore";

// Instagram's supported aspect ratio range for images: 4:5 to 1.91:1.
// Anything outside this gets padded (letterboxed) on upload, never rejected —
// and since both platforms publish the same uploaded file, Facebook gets the
// padded image too.
export const MIN_ASPECT_RATIO = 4 / 5;
export const MAX_ASPECT_RATIO = 1.91;

export const needsLetterbox = (width: number, height: number) => {
  const ratio = width / height;
  return ratio < MIN_ASPECT_RATIO || ratio > MAX_ASPECT_RATIO;
};

export const PLATFORM_KEYS: PostPlatform[] = ["facebook", "instagram"];

export const PLATFORM_LABEL: Record<PostPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
};

type TypeConfig = {
  label: string;
  accept: string;
  multiple: boolean;
  maxItems: number;
  kinds: MediaKind[];
  hasCaption: boolean;
  hasTitle: boolean;
  hasLink: boolean;
  dropText: string;
  dropSub: string;
};

export const TYPE_CONFIG: Record<PostType, TypeConfig> = {
  post: {
    label: "Post",
    accept: "image/*",
    multiple: true,
    maxItems: 10,
    kinds: ["image"],
    hasCaption: true,
    hasTitle: false,
    hasLink: true,
    dropText: "Drop photos or click to upload",
    dropSub:
      "0 = text/link post · 1 = single photo · 2+ = carousel (up to 10)",
  },
  video: {
    label: "Video / Reel",
    accept: "video/*",
    multiple: false,
    maxItems: 1,
    kinds: ["video"],
    hasCaption: true,
    hasTitle: true,
    hasLink: false,
    dropText: "Drop a video or click to upload",
    dropSub: "Publishes as a video on Facebook, a Reel on Instagram",
  },
  story: {
    label: "Story",
    accept: "image/*,video/*",
    multiple: false,
    maxItems: 1,
    kinds: ["image", "video"],
    hasCaption: false,
    hasTitle: false,
    hasLink: false,
    dropText: "Drop a photo or video or click to upload",
    dropSub: "Stories don’t support captions",
  },
};

export const POST_TYPES = Object.keys(TYPE_CONFIG) as PostType[];
