import { type ReactElement } from "react"
import { Box, Typography } from "@mui/material"
import styles from "./styles.module.scss"
import { TEMP_RECENT_MESSAGES } from "./consts"

export default function RecentMessages(): ReactElement {
  return (
    <Box className={styles.recentMessagesContainer}>
      <Typography className={styles.title}>RECENT MESSAGES</Typography>
      <Box className={styles.messages}>
        {TEMP_RECENT_MESSAGES.map((message) =>
          <Box key={message.id} className={styles.singleMessageContainer}>
            <Box className={styles.profileIcon}></Box>
            <Box className={styles.labelsContainer}>
              <Typography className={styles.messageSender}>{message.sender}</Typography>
              <Typography className={styles.message}>{message.latestMessage}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}