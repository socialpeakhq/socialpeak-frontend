import { PostsContainingAnalytics } from "@/react-query/posts/posts.type";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PLATFORM_NAME } from "@/components/posts/platformIcons";
import { KPI_METRICS } from "@/components/analytics/PostsCards/useTotalCalculator";
import { formatDateTime } from "@/utils/helper.functions";
import styles from "./styles.module.scss";

export type PostRow = {
  id: string;
  postId: number;
  caption: string;
  type: string;
  mediaUrls: string[];
  platform: string;
  publishedAt: string;
  views?: number;
  reach?: number;
  likes?: number;
};

const PLATFORM_COLOR: Record<string, string> = {
  facebook: "#6c4ff0",
  instagram: "#ff6f91",
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

// One row per post per platform, because metrics are reported per platform.
export const toPostRows = (posts: PostsContainingAnalytics[]): PostRow[] =>
  posts.flatMap((post) =>
    post.targets
      .filter((target) => target.status === "published")
      .map((target) => {
        const row: PostRow = {
          id: `${post.id}-${target.id}`,
          postId: post.id,
          caption: post.caption,
          type: post.type,
          mediaUrls: post.media_urls,
          platform: target.platform,
          publishedAt: target.published_at,
        };
        for (const item of target.postAnalytics) {
          const kpi = KPI_METRICS[target.platform]?.[item.metric];
          if (kpi) row[kpi] = item.value;
        }
        return row;
      }),
  );

const renderMetric = (params: GridRenderCellParams<PostRow>) =>
  params.value === undefined ? (
    <span className={styles.cellNa}>—</span>
  ) : (
    <span className={styles.cellNum}>{formatCompact(params.value)}</span>
  );

export const columns: GridColDef<PostRow>[] = [
  {
    field: "post",
    headerName: "Post",
    flex: 2,
    minWidth: 260,
    sortable: false,
    renderCell(params: GridRenderCellParams<PostRow>) {
      const { mediaUrls, type, caption, postId } = params.row;
      return (
        <Box className={styles.postCell}>
          {mediaUrls.length > 0 && type !== "reel" ? (
            <img src={mediaUrls[0]} alt="" className={styles.thumb} />
          ) : (
            <Box className={`${styles.thumb} ${styles.thumbPlaceholder}`} />
          )}
          <Box className={styles.postText}>
            <span className={styles.postCaption} title={caption}>
              {caption || "No caption"}
            </span>
            <span className={styles.postSub}>#{postId}</span>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "platform",
    headerName: "Platform",
    flex: 1,
    renderCell(params: GridRenderCellParams<PostRow>) {
      const { platform } = params.row;
      return (
        <span className={styles.chip}>
          <i
            className={styles.platformDot}
            style={{ backgroundColor: PLATFORM_COLOR[platform] }}
          />
          {PLATFORM_NAME[platform]}
        </span>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    renderCell(params: GridRenderCellParams<PostRow>) {
      return <span className={styles.chip}>{params.row.type}</span>;
    },
  },
  {
    field: "publishedAt",
    headerName: "Published",
    flex: 1,
    renderCell(params: GridRenderCellParams<PostRow>) {
      return <span>{formatDateTime(params.row.publishedAt)}</span>;
    },
  },
  {
    field: "views",
    headerName: "Views",
    flex: 1,
    type: "number",
    renderCell: renderMetric,
  },
  {
    field: "reach",
    headerName: "Reach",
    flex: 1,
    type: "number",
    renderCell: renderMetric,
  },
  {
    field: "likes",
    headerName: "Likes",
    flex: 1,
    type: "number",
    renderCell: renderMetric,
  },
];
