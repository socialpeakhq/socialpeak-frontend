import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";

const DEFAULT_TIMELINES = [
  { id: 1, label: "7D", value: "7d" },
  { id: 2, label: "30D", value: "30d" },
  { id: 3, label: "90D", value: "90d" },
];

export default function TimelineSelector() {
  const [selectedTimeline, setSelectedTimeline] = useState<string>("7d");
  return (
    <Box className={styles.timelineContainer}>
      {DEFAULT_TIMELINES.map((item) => (
        <Button
          onClick={() => setSelectedTimeline(item.value)}
          key={item.id}
          variant="contained"
          className={`${styles.singleItem} ${selectedTimeline === item.value && styles.selectedItem}`}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
