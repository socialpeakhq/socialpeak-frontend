import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import LinkOffIcon from "@mui/icons-material/LinkOff";

export default function EmptyWorkspace() {
  return (
    <Box className={styles.emptyWorkspaceContainer}>
      <Box className={styles.mainIconContainer}>
        <LinkOffIcon />
      </Box>
    </Box>
  );
}
