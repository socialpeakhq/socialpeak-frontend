'use client'

import { type ReactElement } from "react"
import useAlertStore from "@/stores/useAlertStore"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import styles from "./styles.module.scss"

export default function AlertPopUp(): ReactElement {
  const open = useAlertStore(s => s.open);
  const message = useAlertStore(s => s.message);
  const severity = useAlertStore(s => s.severity);
  const hideAlert = useAlertStore(s => s.hideAlert);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      autoHideDuration={5000}
      onClose={hideAlert}
      className={styles.snackbar}
    >
      <Alert severity={severity ?? "info"} className={styles.alertContainer}>
        <Typography className={styles.alertMessage}>{message}</Typography>
      </Alert>
    </Snackbar>
  )
}