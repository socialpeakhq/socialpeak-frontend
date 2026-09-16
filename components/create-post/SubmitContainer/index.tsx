"use client";

import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUploadMediaToUrl } from "@/react-query/posts/useUploadMediaToUrl";
import usePostStore from "@/stores/usePostStore";
import { usePublishPost } from "@/react-query/posts/usePublishPost";

export default function SubmitContainer() {
  const { mutate: publishMediaToUrl } = useUploadMediaToUrl();
  const { mutate: publishPost } = usePublishPost();
  const media = usePostStore((s) => s.createPostData?.media);
  const [scheduleType, setScheduleType] = useState<string>("now");

  const handlePublishClick = () => {
    if (media) {
      if (typeof media === "string") {
        publishMediaToUrl([media]);
      } else {
        publishMediaToUrl(media);
      }
    } else {
      publishPost(undefined);
    }
  };

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
      <Button
        onClick={handlePublishClick}
        variant="contained"
        className={styles.submitButton}
      >
        Publish Now
      </Button>
    </Box>
  );
}
