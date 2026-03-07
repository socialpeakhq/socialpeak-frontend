import { Box, Button, Checkbox, TextField, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from "./styles.module.scss"

export default function SignInForm() {
  return (
    <Box className={styles.container}>
      <Typography className={styles.formLabel}>Sign In</Typography>
      <Typography className={styles.subLabel}>Enter your credentials to access your account</Typography>
      <Box className={styles.form}>
        <TextField variant="filled" type="email" placeholder="E-mail" className={styles.input} />
        <TextField variant="filled" type="password" placeholder="Password" className={styles.input} />
        <Box className={styles.row}>
          <Box className={styles.rememberGroup}>
            <Checkbox className={styles.checkbox} />
            <Typography className={styles.label}>
              Remember Me
            </Typography>
          </Box>
          <Typography className={styles.forgotPassword}>Forgot password?</Typography>
        </Box>
        <Button variant="contained" className={styles.signInButton}>Sign In <ArrowForwardIcon /></Button>
        <Box className={styles.footerContainer}>
          <Typography className={styles.footerLabel}>Don&apos;t have an account?</Typography>
          <Typography className={styles.createAccountLabel}>Create one now</Typography>
        </Box>
      </Box>
    </Box>
  )
}