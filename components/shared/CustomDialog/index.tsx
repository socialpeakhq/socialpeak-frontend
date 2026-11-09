import { ReactNode } from "react";
import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";

export type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  maxWidth?: Breakpoint;
  children: ReactNode;
};

export default function CustomDialog({
  open,
  onClose,
  title,
  subtitle,
  icon,
  actions,
  maxWidth = "sm",
  children,
}: CustomDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{ paper: { className: styles.paper } }}
    >
      <DialogTitle className={styles.title}>
        <Box className={styles.titleLeft}>
          {icon}
          <Box className={styles.titleText}>
            <Typography noWrap className={styles.titleLabel}>
              {title}
            </Typography>
            {subtitle && (
              <Typography className={styles.subtitleLabel}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          className={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      {actions && (
        <DialogActions className={styles.actions}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
