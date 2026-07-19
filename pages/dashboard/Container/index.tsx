"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import EmptyWorkspace from "@/components/shared/EmptyWorkspace";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useMetaInsightsByPlatform } from "@/react-query/connections/useMetaInsightsByPlatform";
import Cards from "../Cards";

export default function Container() {
  const connected_accounts = useWorkspaceStore(
    (s) => s.selectedWorkspace?.connected_accounts,
  );

  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const selectedPlatform = useWorkspaceStore((s) => s.selectedPlatform);

  useMetaInsightsByPlatform(selectedWorkspaceId, selectedPlatform);

  return (
    <Box className={styles.dashboardContainer}>
      {connected_accounts?.length === 0 ? (
        <EmptyWorkspace />
      ) : (
        <Box>
          <Cards />
        </Box>
      )}
    </Box>
  );
}
