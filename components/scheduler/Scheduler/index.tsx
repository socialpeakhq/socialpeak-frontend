"use client";

import { Box } from "@mui/material";
import dayjs from "dayjs";
import type {
  SchedulerEvent,
  SchedulerEventColor,
} from "@mui/x-scheduler/models";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useScheduledPosts } from "@/react-query/posts/useScheduledPosts";
import Schedule from "@/components/shared/Schedule";

type Platform = "facebook" | "instagram";
type ScheduledPost = {
  id: number | string;
  type: "post" | "video" | "story";
  title?: string;
  caption?: string;
  platforms: Platform[];
  scheduled_at: string | number; // ISO string or unix seconds
};

const TYPE_LABEL: Record<ScheduledPost["type"], string> = {
  post: "Post",
  video: "Video/Reel",
  story: "Story",
};

const PLATFORM_LABEL: Record<Platform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
};

const EMPTY: ScheduledPost[] = [];

const getColor = (platforms: Platform[]): SchedulerEventColor => {
  if (platforms.length > 1) return "purple";
  return platforms[0] === "facebook" ? "blue" : "pink";
};

const mapPostToEvent = (post: ScheduledPost): SchedulerEvent => {
  const start =
    typeof post.scheduled_at === "number"
      ? dayjs.unix(post.scheduled_at)
      : dayjs(post.scheduled_at);

  return {
    id: post.id,
    title:
      post.type === "story"
        ? TYPE_LABEL.story
        : post.caption || post.title || TYPE_LABEL[post.type],
    description: post.platforms.map((p) => PLATFORM_LABEL[p]).join(" · "),
    start: start.toISOString(),
    end: start.add(30, "minute").toISOString(),
    color: getColor(post.platforms),
    className: [styles.platforms, ...post.platforms.map((p) => styles[p])].join(
      " ",
    ),
  };
};

export default function SchedulerContent() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { data } = useScheduledPosts(workspaceId);

  return (
    <Box className={styles.schedulerContainer}>
      <Schedule<ScheduledPost>
        data={(data as ScheduledPost[] | undefined) ?? EMPTY}
        mapToEvent={mapPostToEvent}
        onEventClick={(item) => console.log(item)}
      />
    </Box>
  );
}
