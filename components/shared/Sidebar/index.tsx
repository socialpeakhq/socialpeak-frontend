import { type ReactElement } from "react";
import styles from "./styles.module.scss"
import { Box } from "@mui/material";

export default function Sidebar(): ReactElement {
  return (
    <Box className={styles.sidebarContainer}></Box>
  )
}