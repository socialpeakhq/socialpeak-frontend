"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useScheduledPosts } from "@/react-query/posts/useScheduledPosts";
import Schedule from "@/components/shared/Schedule";
import {
  EMPTY,
  mapPostToEvent,
  ScheduledPost,
} from "@/components/shared/Schedule/utils";

export default function SchedulerContent() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { data } = useScheduledPosts(workspaceId);

  return (
    <Box className={styles.schedulerContainer}>
      <Schedule<ScheduledPost>
        data={(data as ScheduledPost[] | undefined) ?? EMPTY}
        mapToEvent={mapPostToEvent}
        onEventClick={(item) => console.log(item)}
      />
    </Box>
  );
}
