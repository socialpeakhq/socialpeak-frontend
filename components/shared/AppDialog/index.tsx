"use client";

import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  MetaConnectionInformationContent,
  MetaConnectionInformationHeader,
} from "../MetaConnectionInformation";
import useDialogStore from "@/stores/useDialogStore";
import styles from "./styles.module.scss";

export default function AppDialog() {
  const open = useDialogStore((s) => s.open);
  const dialogCaller = useDialogStore((s) => s.dialogCaller);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  return (
    <Dialog
      open={open}
      maxWidth={dialogCaller === "meta" ? "sm" : "lg"}
      fullWidth
      slotProps={{
        backdrop: {
          className: styles.backdrop,
        },
        paper: {
          className: styles.paperContainer,
        },
      }}
    >
      <DialogTitle className={styles.dialogTitleContainer}>
        <Box className={styles.leftSide}>
          {dialogCaller === "meta" ? <MetaConnectionInformationHeader /> : null}
        </Box>
        <Box className={styles.rightSide}>
          <Box onClick={() => closeDialog()} className={styles.closeContainer}>
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {dialogCaller === "meta" ? <MetaConnectionInformationContent /> : null}
      </DialogContent>
    </Dialog>
  );
}
