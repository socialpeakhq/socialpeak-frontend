import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import Filter from "@/components/scheduler/Filter";
import SchedulerContent from "@/components/scheduler/Scheduler";

export default function Scheduler() {
  return (
    <Box className={styles.container}>
      <Box className={styles.filter}>
        <Filter />
      </Box>
      <Box className={styles.scheduler}>
        <SchedulerContent />
      </Box>
    </Box>
  );
}
