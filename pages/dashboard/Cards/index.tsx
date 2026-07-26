import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { MAIN_PLATFORMS } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import { MetaPlatformInsight } from "@/react-query/connections/connections.type";
import { format } from "date-fns";
import RefreshIcon from "@mui/icons-material/Refresh";
import Card from "@/components/dashboard/Card";

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

  const data: MetaPlatformInsight[] | undefined = queryClient.getQueryData([
    "insights",
    selectedWorkspaceId,
    selectedPlatform,
  ]);

  return (
    <Box className={styles.cardsContainer}>
      <Typography className={styles.title}>
        Today&apos;s Performance, {format(new Date(), "MMM")}{" "}
        {new Date().getDay()}
      </Typography>
      <Box className={styles.platformContainer}>
        <Box className={styles.accounts}>
          {connected_accounts &&
            MAIN_PLATFORMS.filter((platform) =>
              connected_accounts?.includes(platform.parentPlatform),
            ).map((platform) => (
              <Button
                variant="contained"
                onClick={() => {
                  setSelectedPlatform(platform.platform);
                  queryClient.invalidateQueries({
                    queryKey: [
                      "insights",
                      selectedWorkspaceId,
                      platform.platform,
                    ],
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
        <Button variant="contained" className={styles.manualButton}>
          <span>Refresh</span>
          <RefreshIcon />
        </Button>
      </Box>

      <Box className={styles.cards}>
        {!data || data.length === 0 ? (
          <Box className={styles.noDataContainer}>
            <Typography className={styles.noDataLabel}>
              There are no available data for this platform
            </Typography>
          </Box>
        ) : (
          data.map((metric) => <Card key={metric.id} data={metric} />)
        )}
      </Box>
    </Box>
  );
}
