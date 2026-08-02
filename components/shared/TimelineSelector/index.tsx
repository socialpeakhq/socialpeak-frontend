import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";

const DEFAULT_TIMELINES = [
  { id: 1, label: "7D", value: "7d" },
  { id: 2, label: "30D", value: "30d" },
  { id: 3, label: "90D", value: "90d" },
];

type IProps = {
  timeline: string;
  handleTimelineChange: (value: string) => void;
};

export default function TimelineSelector({
  handleTimelineChange,
  timeline,
}: IProps) {
  return (
    <Box className={styles.timelineContainer}>
      {DEFAULT_TIMELINES.map((item) => (
        <Button
          onClick={() => handleTimelineChange(item.value)}
          key={item.id}
          variant="contained"
          className={`${styles.singleItem} ${timeline === item.value && styles.selectedItem}`}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
