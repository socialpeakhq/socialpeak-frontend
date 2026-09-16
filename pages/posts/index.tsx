"use client";

import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { usePostLists } from "@/react-query/posts/usePostLists";
import { useMemo } from "react";
import { Post } from "../../react-query/posts/posts.type";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataGrid from "@/components/shared/DataGrid";

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Posts() {
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const { data } = usePostLists(selectedWorkspaceId);

  const columns: GridColDef<Post>[] = [
    {
      field: "id",
      headerName: "Post ID",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        return <span className={styles.cellId}>#{params.row.id}</span>;
      },
    },
    {
      field: "caption",
      headerName: "Caption",
      flex: 2,
      renderCell(params: GridRenderCellParams<Post>) {
        return (
          <span className={styles.cellCaption} title={params.row.caption}>
            {params.row.caption}
          </span>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        return <span>{formatDateTime(params.row.created_at)}</span>;
      },
    },
    {
      field: "media",
      headerName: "Media",
      flex: 1,
      renderCell() {
        return (
          <Button variant="outlined" className={styles.viewButton}>
            View
          </Button>
        );
      },
    },
    {
      field: "targets",
      headerName: "Targets",
      flex: 1,
      renderCell() {
        return (
          <Button variant="outlined" className={styles.viewButton}>
            View
          </Button>
        );
      },
    },
  ];

  const rows: Post[] = useMemo(
    () =>
      data
        ? data.map((item: Post) => ({
            id: item.id,
            caption: item.caption,
            created_at: item.created_at,
            media: item.media_urls,
            targets: item.targets,
          }))
        : [],
    [data],
  );

  return (
    <Box className={styles.postsContainer}>
      <Box className={styles.filterContainer}> FILTER </Box>
      <Box className={styles.listContainer}>
        <DataGrid columns={columns} rows={rows} pagination paginationSize={5} />
      </Box>
    </Box>
  );
}
