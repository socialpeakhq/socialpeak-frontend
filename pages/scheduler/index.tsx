import { Box } from "@mui/material";
import styles from "./styles.module.scss";

export default function Scheduler() {
  return (
    <Box className={styles.container}>
      <Box className={styles.filter}></Box>
      <Box className={styles.scheduler}></Box>
    </Box>
  );
}
