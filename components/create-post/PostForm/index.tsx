"use client";

import { Box } from "@mui/material";

import styles from "./styles.module.scss";
import PostTypeTabs from "../PostTypeTabs";
import PlatformSelection from "../PlatformSelection";
import PostNotices from "../PostNotices";
import CaptionLink from "../CaptionLink";
import PostMedia from "../PostMedia";

export default function PostForm() {
  return (
    <Box className={styles.formContainer}>
      <PostTypeTabs />
      <Box className={styles.label}>Post to</Box>
      <PlatformSelection />
      <PostNotices />
      <CaptionLink />
      <PostMedia />
    </Box>
  );
}
