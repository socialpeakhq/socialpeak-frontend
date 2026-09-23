import { ReactElement } from "react";
import { PostPlatform, PostType } from "@/stores/usePostStore";

export const PLATFORM_GLYPH: Record<PostPlatform, ReactElement> = {
  facebook: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6C16.4 3.55 15.4 3.5 14.3 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H7.7V13h2.7v8h3.1z" />
    </svg>
  ),
  instagram: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  ),
};

export const TYPE_GLYPH: Record<PostType, ReactElement> = {
  post: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  video: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="2" y="5" width="15" height="14" rx="2.5" />
      <path d="M17 9.5l5-3v11l-5-3z" />
    </svg>
  ),
  story: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M9 6h6" />
    </svg>
  ),
};

export const UploadGlyph = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
    <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
  </svg>
);

export const WarningGlyph = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 9v4M12 17h.01M10.3 3.9L2.7 17a2 2 0 001.7 3h15.2a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
  </svg>
);

export const CloseGlyph = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4l16 16M20 4L4 20"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const SendGlyph = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronGlyph = ({
  direction,
}: {
  direction: "left" | "right";
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
  </svg>
);
