import { PostsContainingAnalytics } from "@/react-query/posts/posts.type";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { PLATFORM_NAME } from "@/components/posts/platformIcons";
import { KPI_METRICS } from "@/components/analytics/PostsCards/useTotalCalculator";
import { formatDateTime } from "@/utils/helper.functions";
import styles from "./styles.module.scss";
import useAnalyticsStore from "@/stores/useAnalyticsStore";

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

const DetailsButton = ({ row }: { row: PostRow }) => {
  const handleSelectedPost = useAnalyticsStore((s) => s.handleSelectedPost);
  return (
    <Button
      variant="contained"
      onClick={() => handleSelectedPost(row)}
      className={styles.detailsButton}
    >
      Details
    </Button>
  );
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
    <Typography className={styles.cellNa}>—</Typography>
  ) : (
    <Typography className={styles.cellNum}>
      {formatCompact(params.value)}
    </Typography>
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
          <Avatar
            variant="rounded"
            src={type !== "reel" ? mediaUrls[0] : undefined}
            className={styles.thumb}
          >
            {/* empty child hides MUI's person icon, so the gradient shows */}
            {""}
          </Avatar>
          <Box className={styles.postText}>
            <Typography noWrap className={styles.postCaption} title={caption}>
              {caption || "No caption"}
            </Typography>
            <Typography className={styles.postSub}>#{postId}</Typography>
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
        <Box className={styles.chip}>
          <Box
            className={styles.platformDot}
            sx={{ backgroundColor: PLATFORM_COLOR[platform] }}
          />
          <Typography className={styles.chipText}>
            {PLATFORM_NAME[platform]}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    renderCell(params: GridRenderCellParams<PostRow>) {
      return (
        <Typography className={`${styles.chip} ${styles.chipText}`}>
          {params.row.type}
        </Typography>
      );
    },
  },
  {
    field: "publishedAt",
    headerName: "Published",
    flex: 1,
    renderCell(params: GridRenderCellParams<PostRow>) {
      return (
        <Typography className={styles.cellText}>
          {formatDateTime(params.row.publishedAt)}
        </Typography>
      );
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
  {
    field: "detailsAction",
    headerName: "",
    flex: 1,
    cellClassName: styles.detailsActionContainer,
    renderCell: (params: GridRenderCellParams<PostRow>) => (
      <DetailsButton row={params.row} />
    ),
  },
];
