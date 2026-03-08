import { Box, Typography } from "@mui/material"
import Logo from "../../../assets/images/peak.svg"
import styles from "./styles.module.scss"

export default function SignUpContainer() {
  return (
    <Box className={styles.container}>
      <Box className={styles.leftSide}></Box>
      <Box className={styles.rigtSide}>
        <Box className={styles.iconContainer}>
          <Logo width={150} height={150} className={styles.icon} />
        </Box>
        <Typography className={styles.mainLabel}>
          Join Us Today
        </Typography>
        <Typography className={styles.subLabel}>
          Create your account and unlock a world of possibilities. It only takes a minute!
        </Typography>
      </Box>
    </Box>
  )
} 