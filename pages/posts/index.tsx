"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";

import Filter from "@/components/posts/Filter";
import PostsTable from "@/components/posts/PostsTable";

export default function Posts() {
  return (
    <Box className={styles.postsContainer}>
      <Box className={styles.filterContainer}>
        <Filter />
      </Box>
      <Box className={styles.listContainer}>
        <PostsTable />
      </Box>
    </Box>
  );
}
