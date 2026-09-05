import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import PostForm from "@/components/create-post/PostForm";
import SubmitContainer from "@/components/create-post/SubmitContainer";

export default function CreatePostPage() {
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
        <Box className={styles.previewContainer}></Box>
      </Box>
    </Box>
  );
}
