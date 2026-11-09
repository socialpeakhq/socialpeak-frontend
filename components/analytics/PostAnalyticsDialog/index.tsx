import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useDialogStore from "@/stores/useDialogStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import { useSinglePostAnalytics } from "@/react-query/posts/useSinglePostAnalytics";
import { MetricAnalytics } from "@/react-query/posts/posts.type";
import { PLATFORM_NAME } from "@/components/posts/platformIcons";
import { formatDateTime } from "@/utils/helper.functions";
import KpiCard from "../KpiCard";
import { PostRow } from "../PostsList/columns";
import styles from "./styles.module.scss";

export type PostAnalyticsDialogPayload = PostRow;

const METRIC_LABEL: Record<string, string> = {
  post_media_view: "Views",
  post_total_media_view_unique: "Reach",
  post_reactions_like_total: "Likes",
  post_clicks: "Clicks",
  post_video_views: "Video views",
  post_video_avg_time_watched: "Avg watch time",
  ig_reels_avg_watch_time: "Avg watch time",
  total_interactions: "Interactions",
  saved: "Saves",
};

const STATUS_MESSAGE: Record<string, string> = {
  collecting:
    "This was published recently, so Meta hasn't returned its metrics yet.",
  unavailable: "Meta hasn't returned any metrics for this post.",
  not_published: "This post wasn't published on this platform.",
};

function usePostAnalyticsDialogContent() {
  return useDialogStore((s) => s.dialogContent) as
    PostAnalyticsDialogPayload | undefined;
}

function MetricCard({ metric }: { metric: MetricAnalytics }) {
  const { typical = 0 } = metric.baseline ?? {};
  const isWatchTime = metric.metric.includes("time");

  return (
    <KpiCard
      label={METRIC_LABEL[metric.metric] ?? metric.metric.replaceAll("_", " ")}
      value={
        isWatchTime ? `${(metric.value / 1000).toFixed(1)}s` : metric.value
      }
      change={
        typical > 0 ? ((metric.value - typical) / typical) * 100 : undefined
      }
      description={
        typical > 0 ? "vs your typical post" : "Not enough posts to compare"
      }
    />
  );
}

export function PostAnalyticsDialogHeader() {
  const row = usePostAnalyticsDialogContent();
  if (!row) return null;

  return (
    <Box className={styles.header}>
      <Avatar
        variant="rounded"
        src={row.type !== "reel" ? row.mediaUrls[0] : undefined}
        className={styles.thumb}
      >
        {""}
      </Avatar>
      <Box className={styles.headerText}>
        <Typography noWrap className={styles.title}>
          {row.caption || "No caption"}
        </Typography>
        <Typography className={styles.subtitle}>
          #{row.postId} · {row.type} · {formatDateTime(row.publishedAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export function PostAnalyticsDialogContent() {
  const row = usePostAnalyticsDialogContent();
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const period = useAnalyticsStore((s) => s.filter.period);
  const [platform, setPlatform] = useState(row?.platform);

  const { data, isLoading } = useSinglePostAnalytics(
    row?.postId,
    workspaceId,
    period,
  );

  if (isLoading) {
    return (
      <Box className={styles.center}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  const targets = data?.targets ?? [];
  const target = targets.find((t) => t.platform === platform) ?? targets[0];

  if (!target) {
    return (
      <Typography className={styles.empty}>
        No analytics for this post
      </Typography>
    );
  }

  return (
    <Box className={styles.content}>
      {targets.length > 1 && (
        <Tabs
          value={target.platform}
          onChange={(_, value) => setPlatform(value)}
          className={styles.tabs}
        >
          {targets.map((t) => (
            <Tab
              key={t.target_id}
              value={t.platform}
              label={PLATFORM_NAME[t.platform] ?? t.platform}
              className={styles.tab}
            />
          ))}
        </Tabs>
      )}

      {target.status === "value" ? (
        <Box className={styles.cards}>
          {target.metrics.map((metric) => (
            <MetricCard key={metric.metric} metric={metric} />
          ))}
        </Box>
      ) : (
        <Alert severity="info">{STATUS_MESSAGE[target.status]}</Alert>
      )}

      <Typography className={styles.footNote}>
        Compared with the median of your other{" "}
        {PLATFORM_NAME[target.platform] ?? target.platform} {row?.type}s from
        the last {period} days.
      </Typography>
    </Box>
  );
}
