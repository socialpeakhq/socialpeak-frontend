"use client";

import { Box, Grid } from "@mui/material";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { useGetUserWorkspaces } from "@/react-query/workspaces/useGetUserWorkspaces";
import styles from "./layout.module.scss";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useGetUserWorkspaces();

  return (
    <Grid container className={styles.layout}>
      <Grid size={{ lg: 2 }} className={styles.sidebarGrid}>
        <Sidebar />
      </Grid>
      <Grid size={{ lg: 10 }} className={styles.contentGrid}>
        <Box className={styles.headerContainer}>
          <Header />
        </Box>
        <Box className={styles.content}>{children}</Box>
      </Grid>
    </Grid>
  );
}
