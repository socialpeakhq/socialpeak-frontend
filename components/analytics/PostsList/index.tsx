import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import DataGrid from "@/components/shared/DataGrid";
import PostAnalyticsDialog from "../PostAnalyticsDialog";
import { columns, toPostRows } from "./columns";

const DAY_MS = 24 * 60 * 60 * 1000;

export default function PostsList() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { platform, type, period } = useAnalyticsStore((s) => s.filter);

  const { data, isLoading } = usePostAnalytics(workspaceId);

  const rows = useMemo(() => {
    const from = Date.now() - period * DAY_MS;

    return toPostRows(data ?? []).filter(
      (row) =>
        (type === "all" || row.type === type) &&
        (platform === "all" || row.platform === platform) &&
        new Date(row.publishedAt).getTime() >= from,
    );
  }, [data, platform, type, period]);

  return (
    <Box className={styles.listContainer}>
      <Box className={styles.tableHead}>
        <Typography variant="h3" className={styles.tableTitle}>
          Post performance
        </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={isLoading}
        pagination
        paginationSize={8}
      />
      <PostAnalyticsDialog />
    </Box>
  );
}
