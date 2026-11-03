import { PostsContainingAnalytics } from "@/react-query/posts/posts.type";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Tooltip } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FilterState } from "@/stores/useAnalyticsStore";
import { PLATFORM_NAME } from "@/components/posts/platformIcons";
import { KPI_METRICS } from "@/components/analytics/PostsCards/useTotalCalculator";
import { formatDateTime } from "@/utils/helper.functions";
import {
  CORE_METRICS,
  METRIC_DEFS,
  MetricFormat,
  formatMetric,
  metricsFor,
} from "./metrics";
import styles from "./styles.module.scss";

// One row per post per platform, because metrics are reported per platform.
export type PostRow = {
  id: string;
  postId: number;
  caption: string;
  type: string;
  mediaUrls: string[];
  platform: string;
  publishedAt: string;
  hasAnalytics: boolean;
  metrics: Record<string, number>;
};

const PLATFORM_COLOR: Record<string, string> = {
  facebook: "#6c4ff0",
  instagram: "#ff6f91",
};

const TYPE_LABEL: Record<string, string> = {
  post: "Post",
  photo: "Post",
  reel: "Video/Reel",
  story: "Story",
};

const TYPE_PLURAL: Record<string, string> = {
  post: "posts",
  photo: "posts",
  reel: "reels",
  story: "stories",
};

const TYPE_ICON: Record<string, typeof GridViewOutlinedIcon> = {
  post: GridViewOutlinedIcon,
  photo: GridViewOutlinedIcon,
  reel: VideocamOutlinedIcon,
  story: StayCurrentPortraitOutlinedIcon,
};

export const toPostRows = (posts: PostsContainingAnalytics[]): PostRow[] =>
  posts.flatMap((post) =>
    post.targets
      .filter((target) => target.status === "published" && target.published_at)
      .map((target) => {
        // Rows come oldest first, so the last value per metric is the latest.
        const metrics: Record<string, number> = {};
        for (const row of target.postAnalytics) metrics[row.metric] = row.value;

        return {
          id: `${post.id}-${target.id}`,
          postId: post.id,
          caption: post.caption,
          type: post.type,
          mediaUrls: post.media_urls,
          platform: target.platform,
          publishedAt: target.published_at,
          hasAnalytics: target.postAnalytics.length > 0,
          metrics,
        };
      }),
  );

type MetricSpec = { raw?: string; core?: string; label: string };

// Resolves a column spec to the raw Meta key for this row, or null when the
// platform doesn't report it for this post type.
const rawKeyFor = (row: PostRow, spec: MetricSpec) => {
  const supported = metricsFor(row.platform, row.type);
  if (spec.raw) return supported.includes(spec.raw) ? spec.raw : null;

  const raw = Object.entries(KPI_METRICS[row.platform] ?? {}).find(
    ([, kpi]) => kpi === spec.core,
  )?.[0];
  return raw && supported.includes(raw) ? raw : null;
};

const metricValue = (row: PostRow, spec: MetricSpec) => {
  const raw = rawKeyFor(row, spec);
  if (!raw || !row.hasAnalytics) return null;
  return row.metrics[raw] ?? null;
};

function MetricCell({ row, spec }: { row: PostRow; spec: MetricSpec }) {
  const raw = rawKeyFor(row, spec);

  if (!raw) {
    return (
      <Tooltip
        title={`${PLATFORM_NAME[row.platform] ?? row.platform} doesn't provide this for ${TYPE_PLURAL[row.type] ?? row.type}.`}
        arrow
      >
        <span className={styles.cellNa}>—</span>
      </Tooltip>
    );
  }

  const value = row.metrics[raw];
  if (!row.hasAnalytics || value === undefined) {
    return (
      <Tooltip
        title="Still collecting data. Meta hasn't returned metrics for this post yet."
        arrow
      >
        <span className={styles.cellPending}>
          <AccessTimeIcon className={styles.pendingIcon} />
        </span>
      </Tooltip>
    );
  }

  const fmt: MetricFormat = METRIC_DEFS[raw]?.fmt ?? "int";
  return <span className={styles.cellNum}>{formatMetric(value, fmt)}</span>;
}

export const isSpecificSelection = ({ platform, type }: FilterState) =>
  platform !== "all" && type !== "all" && metricsFor(platform, type).length > 0;

export const getColumns = (
  filter: FilterState,
  onDetails?: (row: PostRow) => void,
): GridColDef<PostRow>[] => {
  const columns: GridColDef<PostRow>[] = [
    {
      field: "post",
      headerName: "Post",
      flex: 2,
      minWidth: 260,
      sortable: false,
      renderCell(params: GridRenderCellParams<PostRow>) {
        const { mediaUrls, type, caption, postId } = params.row;
        const showImage = mediaUrls.length > 0 && type !== "reel";

        return (
          <Box className={styles.postCell}>
            {showImage ? (
              <img src={mediaUrls[0]} alt="" className={styles.thumb} />
            ) : (
              <Box className={`${styles.thumb} ${styles.thumbPlaceholder}`} />
            )}
            <Box className={styles.postText}>
              <span className={styles.postCaption} title={caption}>
                {caption || `No caption (${TYPE_LABEL[type] ?? type})`}
              </span>
              <span className={styles.postSub}>#{postId}</span>
            </Box>
          </Box>
        );
      },
    },
  ];

  if (filter.platform === "all") {
    columns.push({
      field: "platform",
      headerName: "Platform",
      flex: 1,
      minWidth: 120,
      renderCell(params: GridRenderCellParams<PostRow>) {
        const { platform } = params.row;
        return (
          <span className={styles.chip}>
            <i
              className={styles.platformDot}
              style={{ backgroundColor: PLATFORM_COLOR[platform] }}
            />
            {PLATFORM_NAME[platform] ?? platform}
          </span>
        );
      },
    });
  }

  if (filter.type === "all") {
    columns.push({
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 120,
      renderCell(params: GridRenderCellParams<PostRow>) {
        const { type } = params.row;
        const Icon = TYPE_ICON[type];
        return (
          <span className={styles.chip}>
            {Icon && <Icon className={styles.typeIcon} />}
            {TYPE_LABEL[type] ?? type}
          </span>
        );
      },
    });
  }

  columns.push({
    field: "publishedAt",
    headerName: "Published",
    flex: 1,
    minWidth: 140,
    valueGetter: (_value, row) => new Date(row.publishedAt).getTime(),
    renderCell(params: GridRenderCellParams<PostRow>) {
      return <span>{formatDateTime(params.row.publishedAt)}</span>;
    },
  });

  const specs: MetricSpec[] = isSpecificSelection(filter)
    ? metricsFor(filter.platform, filter.type).map((raw) => ({
        raw,
        label: METRIC_DEFS[raw]?.label ?? raw,
      }))
    : CORE_METRICS.map(({ key, label }) => ({ core: key, label }));

  for (const spec of specs) {
    columns.push({
      field: `m:${spec.raw ?? spec.core}`,
      headerName: spec.label,
      flex: 1,
      minWidth: 110,
      type: "number",
      align: "right",
      headerAlign: "right",
      valueGetter: (_value, row) => metricValue(row, spec),
      renderCell(params: GridRenderCellParams<PostRow>) {
        return <MetricCell row={params.row} spec={spec} />;
      },
    });
  }

  if (onDetails) {
    columns.push({
      field: "actions",
      headerName: "",
      width: 110,
      sortable: false,
      align: "right",
      renderCell(params: GridRenderCellParams<PostRow>) {
        return (
          <Button
            variant="outlined"
            className={styles.detailsButton}
            onClick={() => onDetails(params.row)}
          >
            Details
          </Button>
        );
      },
    });
  }

  return columns;
};
