import { KpiMetric } from "@/components/analytics/PostsCards/useTotalCalculator";

export type MetricFormat = "int" | "ms";

export type MetricDef = {
  label: string;
  fmt: MetricFormat;
  hint: string;
};

// Which raw Meta metrics each platform reports per post type.
export const POST_METRICS: Record<string, Record<string, string[]>> = {
  instagram: {
    post: [
      "views",
      "reach",
      "likes",
      "comments",
      "shares",
      "saved",
      "total_interactions",
      "profile_visits",
      "follows",
    ],
    reel: [
      "views",
      "reach",
      "likes",
      "comments",
      "shares",
      "saved",
      "total_interactions",
      "ig_reels_avg_watch_time",
    ],
    story: ["views", "reach", "replies"],
  },
  facebook: {
    post: [
      "post_media_view",
      "post_total_media_view_unique",
      "post_clicks",
      "post_reactions_like_total",
    ],
    reel: [
      "post_media_view",
      "post_clicks",
      "post_video_views",
      "post_video_avg_time_watched",
    ],
    story: [],
  },
};

export const METRIC_DEFS: Record<string, MetricDef> = {
  views: { label: "Views", fmt: "int", hint: "How many times this was viewed." },
  reach: { label: "Reach", fmt: "int", hint: "Unique accounts that saw this." },
  likes: { label: "Likes", fmt: "int", hint: "Likes received." },
  comments: { label: "Comments", fmt: "int", hint: "Comments received." },
  shares: { label: "Shares", fmt: "int", hint: "Times this was shared." },
  saved: { label: "Saves", fmt: "int", hint: "Times this was saved." },
  total_interactions: {
    label: "Interactions",
    fmt: "int",
    hint: "Total interactions Instagram reports for this.",
  },
  profile_visits: {
    label: "Profile visits",
    fmt: "int",
    hint: "Profile visits that came from this.",
  },
  follows: {
    label: "Follows",
    fmt: "int",
    hint: "New follows that came from this.",
  },
  replies: { label: "Replies", fmt: "int", hint: "Replies to this story." },
  ig_reels_avg_watch_time: {
    label: "Avg watch time",
    fmt: "ms",
    hint: "Average time viewers spent watching.",
  },
  post_media_view: {
    label: "Views",
    fmt: "int",
    hint: "How many times this was viewed.",
  },
  post_total_media_view_unique: {
    label: "Reach",
    fmt: "int",
    hint: "Unique people who viewed this.",
  },
  post_clicks: { label: "Clicks", fmt: "int", hint: "Clicks on this post." },
  post_reactions_like_total: {
    label: "Likes",
    fmt: "int",
    hint: "Like reactions received.",
  },
  post_video_views: { label: "Video views", fmt: "int", hint: "Video plays." },
  post_video_avg_time_watched: {
    label: "Avg watch time",
    fmt: "ms",
    hint: "Average time viewers spent watching.",
  },
};

export const CORE_METRICS: { key: KpiMetric; label: string }[] = [
  { key: "views", label: "Views" },
  { key: "reach", label: "Reach" },
  { key: "likes", label: "Likes" },
];

export const metricsFor = (platform: string, type: string) =>
  POST_METRICS[platform]?.[type] ?? [];

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

// Assumes Meta reports watch time in milliseconds.
const formatMs = (ms: number) => {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.floor(seconds / 60)}m ${String(Math.round(seconds % 60)).padStart(2, "0")}s`;
};

export const formatMetric = (value: number, fmt: MetricFormat = "int") =>
  fmt === "ms" ? formatMs(value) : formatCompact(value);
