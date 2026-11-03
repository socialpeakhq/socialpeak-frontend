import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import DataGrid from "@/components/shared/DataGrid";
import { PLATFORM_NAME } from "@/components/posts/platformIcons";
import { getColumns, isSpecificSelection, toPostRows } from "./columns";

const DAY_MS = 24 * 60 * 60 * 1000;

const TYPE_PLURAL: Record<string, string> = {
  post: "Posts",
  photo: "Posts",
  reel: "Reels",
  story: "Stories",
};

export default function PostsList() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const filter = useAnalyticsStore((s) => s.filter);

  const { data, isLoading } = usePostAnalytics(workspaceId);

  const rows = useMemo(() => {
    if (!data) return [];

    const now = Date.now();
    const from = now - filter.period * DAY_MS;

    return toPostRows(data)
      .filter((row) => {
        if (filter.type !== "all" && row.type !== filter.type) return false;
        if (filter.platform !== "all" && row.platform !== filter.platform)
          return false;
        const publishedAt = new Date(row.publishedAt).getTime();
        return publishedAt >= from && publishedAt < now;
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }, [data, filter]);

  const columns = useMemo(() => getColumns(filter), [filter]);

  const hint = isSpecificSelection(filter)
    ? `Showing every ${PLATFORM_NAME[filter.platform]} ${TYPE_PLURAL[filter.type]} metric`
    : "Showing core metrics. Pick a platform and a type to see every metric.";

  return (
    <Box className={styles.listContainer}>
      <Box className={styles.tableHead}>
        <Typography variant="h3" className={styles.tableTitle}>
          Post performance
        </Typography>
        <span className={styles.tableHint}>{hint}</span>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={isLoading}
        pagination
        paginationSize={8}
      />
    </Box>
  );
}
