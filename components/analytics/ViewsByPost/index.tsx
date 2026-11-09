import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import { PostsContainingAnalytics } from "@/react-query/posts/posts.type";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useMemo } from "react";
import { KPI_METRICS } from "@/components/analytics/PostsCards/useTotalCalculator";

const DAY_MS = 24 * 60 * 60 * 1000;

const PLATFORM_META = {
  facebook: { name: "Facebook", color: "#6c4ff0" },
  instagram: { name: "Instagram", color: "#ff6f91" },
};
const AXIS_COLOR = "#9c97ae";
const Y_AXIS_COLOR = "#6b6580";
const GRID_COLOR = "#efeafb";

const formatCompact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

function ViewsTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;

  return (
    <Box className={styles.tooltip}>
      <Typography className={styles.tooltipLabel}>{label}</Typography>
      {payload.map((item) => (
        <Box key={item.dataKey as string} className={styles.tooltipRow}>
          <Typography className={styles.caption}>{}</Typography>
          <Box
            component="span"
            className={styles.dot}
            sx={{ bgcolor: item.color }}
          />
          <Typography component="span" className={styles.tooltipText}>
            {item.name}: {Number(item.value).toLocaleString("en-US")}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function ViewsByPost() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const filter = useAnalyticsStore((s) => s.filter);

  const data: PostsContainingAnalytics[] = usePostAnalytics(workspaceId).data;

  const composeChartData = useMemo(() => {
    const from = Date.now() - filter.period * DAY_MS;

    const result = [...(data ?? [])]
      .map((post) => ({
        ...post,
        targets: post.targets.filter(
          (target) =>
            (filter.platform === "all" ||
              filter.platform === target.platform) &&
            new Date(target.published_at).getTime() >= from,
        ),
      }))
      .filter((post) => post.targets.length > 0)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .map((post) => {
        let row = {
          label: new Date(post.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          instagram: 0,
          facebook: 0,
        };
        post.targets.forEach((target) => {
          row = {
            ...row,
            [target.platform]:
              // Rows are oldest first; Facebook names views "post_media_view".
              target.postAnalytics.findLast(
                (item) =>
                  KPI_METRICS[target.platform]?.[item.metric] === "views",
              )?.value ?? 0,
          };
        });
        return row;
      });

    return result;
  }, [data, filter.platform, filter.period]);

  return (
    <Box className={styles.viewsByPost}>
      <Box className={styles.header}>
        <Box>
          <Typography component="h3" className={styles.title}>
            Views by post
          </Typography>
          <Typography className={styles.subtitle}>
            One bar per post, oldest to newest.
          </Typography>
        </Box>
        <Box className={styles.legend}>
          {Object.values(PLATFORM_META).map((platform) => (
            <Box key={platform.name} className={styles.legendItem}>
              <Box
                component="span"
                className={styles.dot}
                sx={{ bgcolor: platform.color }}
              />
              <Typography component="span" className={styles.legendText}>
                {platform.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <BarChart
        className={styles.chart}
        responsive
        data={composeChartData}
        barGap={2}
        barCategoryGap="20%"
        margin={{ top: 16, right: 0, bottom: 0, left: 0 }}
      >
        <CartesianGrid vertical={false} stroke={GRID_COLOR} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={{ stroke: GRID_COLOR }}
          tick={{ fill: AXIS_COLOR, fontSize: 11 }}
        />
        <YAxis
          width={44}
          domain={[0, "auto"]}
          tickCount={4}
          allowDecimals={false}
          tickFormatter={formatCompact}
          tickLine={false}
          axisLine={false}
          tick={{ fill: Y_AXIS_COLOR, fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "rgba(108, 79, 240, 0.05)" }}
          content={ViewsTooltip}
        />
        <Bar
          dataKey="facebook"
          name={PLATFORM_META.facebook.name}
          fill={PLATFORM_META.facebook.color}
          radius={[5, 5, 2, 2]}
          maxBarSize={26}
          minPointSize={2}
        />
        <Bar
          dataKey="instagram"
          name={PLATFORM_META.instagram.name}
          fill={PLATFORM_META.instagram.color}
          radius={[5, 5, 2, 2]}
          maxBarSize={26}
          minPointSize={2}
        />
      </BarChart>
    </Box>
  );
}
