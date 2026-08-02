import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import AudienceGrowth from "@/components/analytics/AudienceGrowth";
import { MAIN_PLATFORMS } from "../constants";
import TimelineSelector from "@/components/shared/TimelineSelector";
import { useState } from "react";

export default function AudienceContainer() {
  const [timeline, setTimeline] = useState<string>("7d");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");

  const handleTimelineChange = (value: string) => {
    setTimeline(value);
  };

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
        <AudienceGrowth caller="dashboard" />
      </Box>
    </Box>
  );
}
