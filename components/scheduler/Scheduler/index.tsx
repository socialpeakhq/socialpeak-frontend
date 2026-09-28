"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useScheduledPosts } from "@/react-query/posts/useScheduledPosts";

export default function SchedulerContent() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { data } = useScheduledPosts(workspaceId);

  console.log(data);

  return <Box className={styles.schedulerContainer}></Box>;
}
