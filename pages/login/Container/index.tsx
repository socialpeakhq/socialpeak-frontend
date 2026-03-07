import { Box, Typography } from "@mui/material"
import SignInForm from "../SignInForm";
import Logo from "../../../assets/images/peak.svg";
import styles from "./styles.module.scss"

export default function LoginContainer() {
  return (
    <Box className={styles.loginContainer}>
      <Box className={styles.leftSide}>
        <Box className={styles.iconContainer}>
          <Logo width={150} height={150} className={styles.icon} />
        </Box>
        <Typography className={styles.mainLabel}>
          Welcome Back!
        </Typography>
        <Typography className={styles.subLabel}>
          Continue your journey with us. Sign in to access your personalized dashboard.
        </Typography>
      </Box>
      <div className={styles.rightSide}>
        <SignInForm />
      </div>
    </Box>
  )
}  