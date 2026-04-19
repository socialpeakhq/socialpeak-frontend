import { type ReactElement } from "react"
import { Box, Typography } from "@mui/material"
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { TEMP_RECENT_MESSAGES } from "./consts"
import styles from "./styles.module.scss"

export default function RecentMessages(): ReactElement {
  return (
    <Box className={styles.recentMessagesContainer}>
      <Typography className={styles.title}>RECENT MESSAGES</Typography>
      <Box className={styles.messages}>
        {TEMP_RECENT_MESSAGES.map((message) =>
          <Box key={message.id} className={styles.singleMessageContainer}>
            <Box className={styles.profileIcon}>
              <Person2OutlinedIcon />
            </Box>
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