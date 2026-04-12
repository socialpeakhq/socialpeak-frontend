"use client"

import { Box, Button, TextField, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Logo from "../../../assets/images/peak.svg"
import { useRouter } from "next/navigation"
import { useSignUp } from "@/react-query/auth/useSignUp";
import { SubmitEvent } from "react";
import styles from "./styles.module.scss"

export default function SignUpForm() {
  const router = useRouter()
  const signupMutation = useSignUp();

  const handleClick = () => {
    router.push("/login")
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Box className={styles.signUpContainer}>
      <Box className={styles.iconContainer}>
        <Logo width={64} height={64} className={styles.icon} />
      </Box>
      <Typography className={styles.formLabel}>Create Account</Typography>
      <Typography className={styles.subLabel}>Start your journey with us today</Typography>
      <form className={styles.form}>
        <TextField
          required
          variant="filled"
          type="text"
          placeholder="Full Name"
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="email"
          placeholder="E-mail"
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="text"
          placeholder="Phone Number"
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
        />
        <Button type="submit" variant="contained" className={styles.submitButton}>
          Sign In <ArrowForwardIcon />
        </Button>
        <Typography className={styles.footerLabel}>
          <span>Already have an account?</span> <span onClick={handleClick}>Sign in instead</span></Typography>
      </form>
    </Box>
  )
}