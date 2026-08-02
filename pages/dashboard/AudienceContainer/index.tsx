import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import AudienceGrowth from "@/components/analytics/AudienceGrowth";
import { MAIN_PLATFORMS } from "../constants";
import TimelineSelector from "@/components/shared/TimelineSelector";
import { useEffect, useState } from "react";
import { useMetaAudience } from "@/react-query/meta/useMetaAudience";
import { useQueryClient } from "@tanstack/react-query";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

export default function AudienceContainer() {
  const fetchAudience = useMetaAudience().mutate;
  const metaAccounts = useQueryClient().getQueryData<Record<string, unknown>>([
    "meta-accounts",
  ]);
  const selectedWorkspace = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const audienceData = useQueryClient().getQueryData<
    { id: number; value: number; date: string }[]
  >(["audience-growth"]);
  const [timeline, setTimeline] = useState<string>("7d");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");

  const handleTimelineChange = (value: string) => {
    setTimeline(value);
  };

  useEffect(() => {
    const pageId = Object.values(metaAccounts?.[selectedPlatform] || {})[0]
      ?.facebook_page_id;

    if (pageId && selectedWorkspace) {
      fetchAudience({
        date: timeline,
        pageId: pageId,
        platform: selectedPlatform,
        workspaceId: selectedWorkspace,
      });
    }
  }, [timeline, selectedPlatform, metaAccounts, selectedWorkspace]);

  return (
    <Box className={styles.audienceContainer}>
      <Typography className={styles.title}>Audience Growth</Typography>
      <Box className={styles.audienceTopBar}>
        <Box className={styles.platforms}>
          {MAIN_PLATFORMS.map((platform) => (
            <Box
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.platform)}
              className={`${styles.singlePlatform} ${selectedPlatform === platform.platform && styles.selectedPlatform}`}
            >
              <Box
                sx={{ backgroundColor: platform.mainColor }}
                className={styles.icon}
              />
              <Typography className={styles.platformLabel}>
                {platform.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className={styles.timelineContainer}>
          <TimelineSelector
            handleTimelineChange={handleTimelineChange}
            timeline={timeline}
          />
        </Box>
      </Box>
      <Box className={styles.graphContainer}>
        {audienceData && audienceData.length > 0 ? (
          <AudienceGrowth
            data={audienceData}
            caller="dashboard"
            lineFill={
              MAIN_PLATFORMS.find((item) => item.platform === selectedPlatform)
                ?.mainColor
            }
          />
        ) : (
          <Box className={styles.emptyState}>
            <Typography className={styles.emptyLabel}>
              There are no audience data for this platform
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
