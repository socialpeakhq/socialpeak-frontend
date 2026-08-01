"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import EmptyWorkspace from "@/components/shared/EmptyWorkspace";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useMetaInsightsByPlatform } from "@/react-query/connections/useMetaInsightsByPlatform";
import Cards from "../Cards";
import ConnectedAccountsView from "../ConnectedAccountsView";
import AudienceContainer from "../AudienceContainer";

export default function Container() {
  const connected_accounts = useWorkspaceStore(
    (s) => s.selectedWorkspace?.connected_accounts,
  );

  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const selectedPlatform = useWorkspaceStore((s) => s.selectedPlatform);

  useMetaInsightsByPlatform(selectedWorkspaceId, selectedPlatform);

  if (connected_accounts?.length === 0) {
    return (
      <Box className={styles.dashboardContainer}>
        <EmptyWorkspace />
      </Box>
    );
  }

  return (
    <Box className={styles.dashboardContainer}>
      <Cards />
      <AudienceContainer />
      <Box className={styles.rowContent}>
        <Box className={styles.left}>SCHEDULED POSTS</Box>
        <Box className={styles.right}>
          <ConnectedAccountsView />
        </Box>
      </Box>
    </Box>
  );
}
