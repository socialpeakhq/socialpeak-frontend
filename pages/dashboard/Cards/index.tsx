import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { MAIN_PLATFORMS } from "../constants";
import { useQueryClient } from "@tanstack/react-query";

export default function Cards() {
  const queryClient = useQueryClient();

  const connected_accounts: string[] | undefined = useWorkspaceStore(
    (s) => s.selectedWorkspace?.connected_accounts,
  );
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const setSelectedPlatform = useWorkspaceStore((s) => s.setSelectedPlatform);
  const selectedPlatform = useWorkspaceStore((s) => s.selectedPlatform);

  return (
    <Box className={styles.cardsContainer}>
      <Box className={styles.platformContainer}>
        {connected_accounts &&
          MAIN_PLATFORMS.filter((platform) =>
            connected_accounts?.includes(platform.parentPlatform),
          ).map((platform) => (
            <Button
              variant="contained"
              onClick={() => {
                setSelectedPlatform(platform.platform);
                queryClient.invalidateQueries({
                  queryKey: ["insights", selectedWorkspaceId, platform],
                });
              }}
              key={platform.id}
              className={`${styles.platformButton} ${selectedPlatform === platform.platform && styles.selectedPlatform}`}
            >
              {platform.icon}
              {platform.label}
            </Button>
          ))}
      </Box>
    </Box>
  );
}
