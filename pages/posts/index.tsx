"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { usePostLists } from "@/react-query/posts/usePostLists";

export default function Posts() {
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const { data } = usePostLists(selectedWorkspaceId);

  return (
    <Box className={styles.postsContainer}>
      <Box className={styles.filterContainer}> FILTER </Box>
      <Box className={styles.listContainer}></Box>
    </Box>
  );
}
