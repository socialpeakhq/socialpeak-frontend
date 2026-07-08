"use client";

import { Box, Grid } from "@mui/material";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import styles from "./layout.module.scss";
import useAuthStore from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserWorkspaces } from "@/react-query/workspaces/useGetUserWorkspaces";
import { User } from "@/react-query/auth/auth.types";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAuth = useAuthStore((s) => s.isAuth);
  const authUser = useQueryClient().getQueryData<User>(["auth"]);

  useGetUserWorkspaces(authUser?.id ?? 0);

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
