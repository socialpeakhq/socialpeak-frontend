"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import usePostStore, { PostPlatform } from "@/stores/usePostStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { usePublishPost } from "@/react-query/posts/usePublishPost";
import { usePostLists } from "@/react-query/posts/usePostLists";
import { Post, PostTarget } from "@/react-query/posts/posts.type";
import { PLATFORM_LABEL, TYPE_CONFIG } from "../constants";
import { PLATFORM_GLYPH, SendGlyph } from "../icons";
import PostSchedule from "../PostSchedule";
import styles from "./styles.module.scss";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  failed: "Failed",
  processing: "Processing",
  published: "Published",
};

// Instagram containers (videos, video stories) are published by a backend
// job, so their target stays "processing" until that job picks them up.
const POLL_INTERVAL = 5000;

const findTargets = (post?: Post, posts?: Post[]): PostTarget[] =>
  (post && posts?.find((item) => item.id === post.id)?.targets) ??
  post?.targets ??
  [];

function StatusBadge({
  status,
  errorMessage,
}: {
  status: string;
  errorMessage?: string | null;
}) {
  const badge = (
    <span className={`${styles.badge} ${styles[status] ?? ""}`}>
      <span className={styles.dot} />
      {STATUS_LABEL[status] ?? status}
    </span>
  );

  if (status === "failed" && errorMessage) {
    return (
      <span className={styles.tooltipWrap}>
        {badge}
        <span className={styles.tooltipBubble}>{errorMessage}</span>
      </span>
    );
  }

  return badge;
}

export default function SubmitContainer() {
  const { type, caption, link, media, platforms, scheduled, scheduleTime } =
    usePostStore((s) => s.createPostData);
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { mutate: publishPost, isPending } = usePublishPost();

  const [submittedPlatforms, setSubmittedPlatforms] = useState<
    PostPlatform[]
  >([]);
  const [publishedPost, setPublishedPost] = useState<Post>();
  const [publishError, setPublishError] = useState<string>();

  const { data: posts } = usePostLists(selectedWorkspaceId, {
    refetchInterval: (latestPosts) =>
      findTargets(publishedPost, latestPosts).some(
        (target) => target.status === "processing",
      )
        ? POLL_INTERVAL
        : false,
  });
  const targets = findTargets(publishedPost, posts);

  const config = TYPE_CONFIG[type];
  const igNeedsMedia =
    type === "post" && media.length === 0 && platforms.includes("instagram");
  const needsAnyMedia = type !== "post" && media.length === 0;
  // Stories can't be scheduled on either platform
  const canSchedule = type !== "story";
  const isScheduled = canSchedule && scheduled;
  const hasContent = config.hasCaption
    ? Boolean(caption.trim() || link.trim() || media.length > 0)
    : media.length > 0;
  const canSubmit =
    platforms.length > 0 &&
    hasContent &&
    !igNeedsMedia &&
    !needsAnyMedia &&
    !(isScheduled && !scheduleTime) &&
    !isPending;

  const handlePublishClick = () => {
    setSubmittedPlatforms(platforms);
    setPublishedPost(undefined);
    setPublishError(undefined);

    publishPost(platforms, {
      onSuccess: (post) => setPublishedPost(post),
      onError: (error) => setPublishError(String(error)),
    });
  };

  return (
    <Box className={styles.submitContainer}>
      {canSchedule && <PostSchedule />}
      <button
        type="button"
        onClick={handlePublishClick}
        disabled={!canSubmit}
        className={styles.submitButton}
      >
        <SendGlyph />
        <span>
          {platforms.length === 0
            ? "Select a platform to continue"
            : `${isScheduled ? "Schedule" : "Publish"} ${config.label}`}
        </span>
      </button>
      {submittedPlatforms.length > 0 && (
        <Box className={styles.statusPanel}>
          {submittedPlatforms.map((platform) => {
            const target = targets.find((item) => item.platform === platform);
            const status = publishError
              ? "failed"
              : (target?.status ?? "pending");

            return (
              <Box key={platform} className={styles.statusRow}>
                <span className={styles.statusName}>
                  {PLATFORM_GLYPH[platform]}
                  {PLATFORM_LABEL[platform]}
                </span>
                <StatusBadge
                  status={status}
                  errorMessage={target?.error_message ?? publishError}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
