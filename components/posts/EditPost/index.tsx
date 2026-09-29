import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import useDialogStore from "@/stores/useDialogStore";
import usePostStore from "@/stores/usePostStore";
import { ScheduledPost } from "@/components/shared/Schedule/utils";
import { TYPE_CONFIG } from "@/components/create-post/constants";
import { TYPE_GLYPH } from "@/components/create-post/icons";
import PlatformSelection from "@/components/create-post/PlatformSelection";
import PostNotices from "@/components/create-post/PostNotices";
import PostSchedule from "@/components/create-post/PostSchedule";
import CaptionLink from "@/components/create-post/CaptionLink";
import PostMedia from "@/components/create-post/PostMedia";
import { useDeleteScheduledPost } from "@/react-query/posts/useDeleteScheduledPost";
import { useUpdateScheduledPost } from "@/react-query/posts/useUpdateScheduledPost";

export function EditPostHeader() {
  const post = useDialogStore((s) => s.dialogContent as ScheduledPost);
  return (
    <Box className={styles.editPostHeader}>
      <Typography className={styles.header}>Edit scheduled post</Typography>
      <Typography className={styles.subHeader}>Post ID: #{post.id}</Typography>
    </Box>
  );
}

export function EditPost() {
  const type = usePostStore((s) => s.editPostData.type);

  return (
    <Box className={styles.editPostContent}>
      <span className={styles.typePill}>
        {TYPE_GLYPH[type]}
        {TYPE_CONFIG[type].label}
      </span>
      <Box className={styles.label}>Post to</Box>
      <PlatformSelection dataKey="editPostData" />
      <PostNotices dataKey="editPostData" />
      <Box className={styles.scheduleContainer}>
        <PostSchedule
          dataKey="editPostData"
          label="Scheduled for"
          showModeTabs={false}
        />
      </Box>
      <CaptionLink dataKey="editPostData" />
      <PostMedia dataKey="editPostData" />
    </Box>
  );
}

export function EditPostActions() {
  const post = useDialogStore((s) => s.dialogContent as ScheduledPost);
  const editPostData = usePostStore((s) => s.editPostData);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  const { mutate: deleteScheduledPost, isPending: isDeletionLoading } =
    useDeleteScheduledPost();
  const { mutate: updateScheduledPost, isPending: isUpdateLoading } =
    useUpdateScheduledPost();

  const handleRemovePost = () => {
    deleteScheduledPost(post.id);
  };

  const handlePostUpdate = () => {
    updateScheduledPost({ id: post.id, data: editPostData });
  };

  return (
    <Box className={styles.actionsContainer}>
      <Button
        variant="contained"
        disabled={isDeletionLoading}
        onClick={handleRemovePost}
        className={`${styles.button} ${styles.danger}`}
      >
        {isDeletionLoading ? <CircularProgress /> : "Remove from schedule"}
      </Button>
      <Box className={styles.actionsRight}>
        <Button
          variant="contained"
          onClick={closeDialog}
          className={`${styles.button} ${styles.ghost}`}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdateLoading}
          variant="contained"
          onClick={handlePostUpdate}
          className={`${styles.button} ${styles.primary}`}
        >
          {isUpdateLoading ? <CircularProgress /> : "Save changes"}
        </Button>
      </Box>
    </Box>
  );
}
