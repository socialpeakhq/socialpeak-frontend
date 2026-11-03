import { PostsContainingAnalytics } from "@/react-query/posts/posts.type";
import { FilterState } from "@/stores/useAnalyticsStore";
import { useMemo } from "react";

export type KpiMetric = "views" | "reach" | "likes";

export const KPI_METRICS: Record<string, Record<string, KpiMetric>> = {
  instagram: {
    views: "views",
    reach: "reach",
    likes: "likes",
  },
  facebook: {
    post_media_view: "views",
    post_total_media_view_unique: "reach",
    post_reactions_like_total: "likes",
  },
};

const DAY_MS = 24 * 60 * 60 * 1000;

export type KpiTotals = Record<KpiMetric | "posts", number>;
export type KpiKey = keyof KpiTotals;

const KPI_KEYS: KpiKey[] = ["views", "reach", "likes", "posts"];

// Totals for targets published in [from, to). The end is exclusive so a
// target on the boundary between two periods is only counted once.
const summarize = (
  posts: PostsContainingAnalytics[],
  { type, platform }: Pick<FilterState, "type" | "platform">,
  from: number,
  to: number,
): KpiTotals => {
  const totals: KpiTotals = { views: 0, reach: 0, likes: 0, posts: 0 };

  const targets = posts
    .filter((post) => type === "all" || post.type === type)
    .flatMap((post) => post.targets)
    .filter((target) => {
      if (target.status !== "published" || !target.published_at) return false;
      if (platform !== "all" && target.platform !== platform) return false;
      const publishedAt = new Date(target.published_at).getTime();
      return publishedAt >= from && publishedAt < to;
    });

  totals.posts = targets.length;

  for (const target of targets) {
    // Rows are ordered by captured_at asc, so the last row per metric wins
    const latest = new Map<string, number>();
    for (const row of target.postAnalytics) latest.set(row.metric, row.value);

    for (const [raw, value] of latest) {
      const kpi = KPI_METRICS[target.platform]?.[raw];
      if (kpi) totals[kpi] += value;
    }
  }

  return totals;
};

// null means there is nothing in the previous period to compare against
const percentChange = (current: number, previous: number): number | null =>
  previous === 0 ? null : ((current - previous) / previous) * 100;

export const useTotalCalculator = (
  posts: PostsContainingAnalytics[] | undefined,
  filter: FilterState,
) => {
  const { period, type, platform } = filter;

  return useMemo(() => {
    const now = Date.now();
    const periodMs = period * DAY_MS;
    const data = posts ?? [];

    const current = summarize(data, { type, platform }, now - periodMs, now);
    const previous = summarize(
      data,
      { type, platform },
      now - 2 * periodMs,
      now - periodMs,
    );

    const change = Object.fromEntries(
      KPI_KEYS.map((key) => [key, percentChange(current[key], previous[key])]),
    ) as Record<KpiKey, number | null>;

    return { current, previous, change };
  }, [posts, period, type, platform]);
};
