import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import AudienceGrowth from "@/components/analytics/AudienceGrowth";
import { MAIN_PLATFORMS } from "../constants";
import TimelineSelector from "@/components/shared/TimelineSelector";

export default function AudienceContainer() {
  return (
    <Box className={styles.audienceContainer}>
      <Typography className={styles.title}>Audience Growth</Typography>
      <Box className={styles.audienceTopBar}>
        <Box className={styles.platforms}>
          {MAIN_PLATFORMS.map((platform) => (
            <Box key={platform.id} className={styles.singlePlatform}>
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
          <TimelineSelector />
        </Box>
      </Box>
      <Box className={styles.graphContainer}>
        <AudienceGrowth caller="dashboard" />
      </Box>
    </Box>
  );
}
