import { SchedulerEvent, SchedulerEventColor } from "@mui/x-scheduler/models";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

export const EVENT_SELECTOR = [
  ".MuiEventCalendar-dayGridEvent",
  ".MuiEventCalendar-timeGridEvent",
  ".MuiEventCalendar-agendaViewEventListItem",
  ".MuiEventCalendar-eventItemCard",
].join(",");

export type Platform = "facebook" | "instagram";
export type ScheduledPost = {
  id: number | string;
  type: "post" | "video" | "story";
  title?: string;
  caption?: string;
  platforms: Platform[];
  scheduled_at: string | number; // ISO string or unix seconds
  media_urls?: string[];
  metadata?: { link?: string; title?: string } | null;
};

export const TYPE_LABEL: Record<ScheduledPost["type"], string> = {
  post: "Post",
  video: "Video/Reel",
  story: "Story",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
};

export const EMPTY: ScheduledPost[] = [];

export const getColor = (platforms: Platform[]): SchedulerEventColor => {
  if (platforms.length > 1) return "purple";
  return platforms[0] === "facebook" ? "blue" : "pink";
};

export const mapPostToEvent = (post: ScheduledPost): SchedulerEvent => {
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
