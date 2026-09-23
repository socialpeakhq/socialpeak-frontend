"use client";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import { inter, plusJakartaSans } from "@/app/fonts";
import PostForm from "@/components/create-post/PostForm";
import SubmitContainer from "@/components/create-post/SubmitContainer";
import PostPreview from "@/components/create-post/PostPreview";

export default function CreatePostPage() {
  return (
    <Box
      className={`${styles.createPostPageContainer} ${inter.variable} ${plusJakartaSans.variable}`}
    >
      <Box className={styles.header}>
        <h1 className={styles.titleLabel}>Create a post</h1>
        <Box className={styles.titleHelper}>
          Post, Video/Reel, or Story — to Facebook, Instagram, or both
        </Box>
      </Box>
      <Box className={styles.stage}>
        <Box className={styles.layout}>
          <Box>
            <PostForm />
            <SubmitContainer />
          </Box>
          <Box className={styles.previewSticky}>
            <PostPreview />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
