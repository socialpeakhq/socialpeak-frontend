"use client";

import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function SubmitContainer() {
  const [scheduleType, setScheduleType] = useState<string>("now");
  return (
    <Box className={styles.submitContainer}>
      <Typography className={styles.sectionLabel}>When</Typography>
      <Box className={styles.scheduleTypes}>
        <Box
          onClick={() => setScheduleType("now")}
          className={`${styles.type} ${scheduleType === "now" && styles.selectedType}`}
        >
          <Typography className={styles.typeLabel}>Publish now</Typography>
        </Box>
        <Box
          onClick={() => setScheduleType("later")}
          className={`${styles.type} ${scheduleType === "later" && styles.selectedType}`}
        >
          <Typography className={styles.typeLabel}>
            Schedule for later
          </Typography>
        </Box>
      </Box>
      {scheduleType === "later" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Set scheduled date"
            views={["day", "month", "year", "hours", "minutes"]}
            ampm={false}
            orientation="portrait"
            className={styles.dateTimePicker}
          />
        </LocalizationProvider>
      )}
      <Button variant="contained" className={styles.submitButton}>
        Publish Now
      </Button>
    </Box>
  );
}
