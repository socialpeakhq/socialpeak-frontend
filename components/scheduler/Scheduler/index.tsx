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
import useDialogStore from "@/stores/useDialogStore";
import usePostStore from "@/stores/usePostStore";
import {
  mapScheduledPostToPostData,
  measureEditPostMedia,
} from "@/components/posts/EditPost/utils";

export default function SchedulerContent() {
  const openDialog = useDialogStore((s) => s.openDialog);
  const setEditPostData = usePostStore((s) => s.setEditPostData);
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const { data } = useScheduledPosts(workspaceId);

  return (
    <Box className={styles.schedulerContainer}>
      <Schedule<ScheduledPost>
        data={(data as ScheduledPost[] | undefined) ?? EMPTY}
        mapToEvent={mapPostToEvent}
        onEventClick={(item) => {
          // seed the form before opening so it never shows a previous post
          const postData = mapScheduledPostToPostData(item);
          setEditPostData(postData);
          measureEditPostMedia(postData.media);
          openDialog({ dialogCaller: "editPost", dialogContent: item });
        }}
      />
    </Box>
  );
}
