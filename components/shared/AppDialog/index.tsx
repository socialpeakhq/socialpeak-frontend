"use client";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Breakpoint } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  MetaConnectionInformationContent,
  MetaConnectionInformationHeader,
} from "../MetaConnectionInformation";
import {
  MediaDialogContent,
  MediaDialogHeader,
} from "@/components/posts/MediaDialog";
import {
  TargetsDialogContent,
  TargetsDialogHeader,
} from "@/components/posts/TargetsDialog";
import useDialogStore from "@/stores/useDialogStore";
import styles from "./styles.module.scss";
import {
  EditPost,
  EditPostActions,
  EditPostHeader,
} from "@/components/posts/EditPost";

const DIALOG_MAX_WIDTH: Record<string, Breakpoint> = {
  meta: "sm",
  "post-media": "sm",
  "post-targets": "sm",
  editPost: "sm",
};

export default function AppDialog() {
  const open = useDialogStore((s) => s.open);
  const dialogCaller = useDialogStore((s) => s.dialogCaller);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  return (
    <Dialog
      open={open}
      maxWidth={DIALOG_MAX_WIDTH[dialogCaller] ?? "lg"}
      fullWidth
      onClose={closeDialog}
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
          {dialogCaller === "post-media" ? <MediaDialogHeader /> : null}
          {dialogCaller === "post-targets" ? <TargetsDialogHeader /> : null}
          {dialogCaller === "editPost" && <EditPostHeader />}
        </Box>
        <Box className={styles.rightSide}>
          <Box onClick={() => closeDialog()} className={styles.closeContainer}>
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {dialogCaller === "meta" ? <MetaConnectionInformationContent /> : null}
        {dialogCaller === "post-media" ? <MediaDialogContent /> : null}
        {dialogCaller === "post-targets" ? <TargetsDialogContent /> : null}
        {dialogCaller === "editPost" && <EditPost />}
      </DialogContent>
      {dialogCaller === "editPost" && (
        <DialogActions className={styles.dialogActions}>
          <EditPostActions />
        </DialogActions>
      )}
    </Dialog>
  );
}
