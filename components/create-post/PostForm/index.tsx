"use client";

import { Box, Typography } from "@mui/material";

import styles from "./styles.module.scss";
import PlatformSelection from "../PlatformSelection";
import CaptionLink from "../CaptionLink";

export default function PostForm() {
  return (
    <Box className={styles.formContainer}>
      <Box className={styles.container}>
        <Typography className={styles.label}>Post To</Typography>
        <PlatformSelection />
      </Box>
      <Box className={styles.container}>
        <Typography className={styles.label}>Caption</Typography>
        <CaptionLink />
      </Box>
    </Box>
  );
}
