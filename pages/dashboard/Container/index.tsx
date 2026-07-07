import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import EmptyWorkspace from "@/components/shared/EmptyWorkspace";

export default function Container() {
  return (
    <Box className={styles.dashboardContainer}>
      <EmptyWorkspace />
    </Box>
  );
}
