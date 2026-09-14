"use client";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import PostForm from "@/components/create-post/PostForm";
import SubmitContainer from "@/components/create-post/SubmitContainer";
import usePostStore from "@/stores/usePostStore";
import FacebookPreview from "@/components/create-post/FacebookPreview";
import { ReactElement } from "react";

const Platoform_Previews: Record<string, () => ReactElement> = {
  facebook: () => <FacebookPreview />,
  instagram: () => <></>,
};

export default function CreatePostPage() {
  const postData = usePostStore((s) => s.createPostData);

  return (
    <Box className={styles.createPostPageContainer}>
      <Box className={styles.titleContainer}>
        <Typography className={styles.titleLabel}>Create Post</Typography>
        <Typography className={styles.titleHelper}>
          Publish now or Schedule it for later
        </Typography>
      </Box>
      <Box className={styles.content}>
        <Box className={styles.formContainer}>
          <PostForm />
          <SubmitContainer />
        </Box>
        <Box className={styles.previewContainer}>
          {postData &&
            postData.platforms?.map((platform: string) =>
              Platoform_Previews[platform](),
            )}
        </Box>
      </Box>
    </Box>
  );
}
