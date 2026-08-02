"use client";

import { Box, Grid } from "@mui/material";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { useGetUserWorkspaces } from "@/react-query/workspaces/useGetUserWorkspaces";
import styles from "./layout.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useMetaPages } from "@/react-query/meta/useMetaPages";
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAuth = useAuthStore((s) => s.isAuth);
  const getWorkspaceMetaAccounts = useMetaPages().mutate;
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);

  useGetUserWorkspaces();

  useEffect(() => {
    if (
      isAuth &&
      selectedWorkspace &&
      selectedWorkspace.connected_accounts.includes("meta")
    ) {
      getWorkspaceMetaAccounts(selectedWorkspace.workspace_id);
    }
  }, [selectedWorkspace, getWorkspaceMetaAccounts, isAuth]);

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
