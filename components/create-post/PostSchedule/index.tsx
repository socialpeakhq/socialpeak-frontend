import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import usePostStore from "@/stores/usePostStore";
import { inter } from "@/app/fonts";
import styles from "./styles.module.scss";

// Facebook only accepts scheduled times 10 minutes to 30 days from now
const MIN_LEAD_MINUTES = 10;
const MAX_LEAD_DAYS = 30;

const SCHEDULE_OPTIONS = [
  { label: "Publish now", scheduled: false },
  { label: "Schedule for later", scheduled: true },
];

export default function PostSchedule() {
  const scheduled = usePostStore((s) => s.createPostData.scheduled);
  const scheduleTime = usePostStore((s) => s.createPostData.scheduleTime);
  const handleCreatePostSchedule = usePostStore(
    (s) => s.handleCreatePostSchedule,
  );
  const handleCreatePostScheduleTime = usePostStore(
    (s) => s.handleCreatePostScheduleTime,
  );

  return (
    <Box className={styles.scheduleContainer}>
      <Box className={styles.fieldLabel}>When</Box>
      <Box className={styles.scheduleTabs}>
        {SCHEDULE_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => handleCreatePostSchedule(option.scheduled)}
            className={`${styles.scheduleTab} ${scheduled === option.scheduled ? styles.on : ""}`}
          >
            {option.label}
          </button>
        ))}
      </Box>
      {scheduled && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={scheduleTime ? dayjs.unix(scheduleTime) : null}
              onChange={(value) =>
                handleCreatePostScheduleTime(
                  value?.isValid() ? value.unix() : null,
                )
              }
              minDateTime={dayjs().add(MIN_LEAD_MINUTES, "minute")}
              maxDateTime={dayjs().add(MAX_LEAD_DAYS, "day")}
              views={["day", "hours", "minutes"]}
              format="DD/MM/YYYY HH:mm"
              ampm={false}
              className={styles.dateTimePicker}
              slotProps={{
                popper: {
                  className: `${styles.pickerPopper} ${inter.variable}`,
                },
              }}
            />
          </LocalizationProvider>
          <Box className={styles.scheduleNote}>
            Uses your local time zone · between {MIN_LEAD_MINUTES} minutes and{" "}
            {MAX_LEAD_DAYS} days from now
          </Box>
        </>
      )}
    </Box>
  );
}
