"use client"
import { SubmitEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/navigation"
import { useSignUp } from "@/react-query/auth/useSignUp";
import useAuthStore from "@/stores/useAuthStore";
import Logo from "../../../assets/images/peak.svg"
import styles from "./styles.module.scss"

export default function SignUpForm() {
  const registerData = useAuthStore(s => s.registerUserData)
  const handleRegisterDataChange = useAuthStore(s => s.handleRegisterUserData)
  const router = useRouter()
  const signupMutation = useSignUp();

  const handleClick = () => {
    router.push("/login")
  }

  const handleChange = (name: string, value: string) => {
    handleRegisterDataChange(name, value)
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (registerData && registerData.confirm_password === registerData.password)
      signupMutation.mutate(registerData)
  }

  return (
    <Box className={styles.signUpContainer}>
      <Box className={styles.iconContainer}>
        <Logo width={64} height={64} className={styles.icon} />
      </Box>
      <Typography className={styles.formLabel}>Create Account</Typography>
      <Typography className={styles.subLabel}>Start your journey with us today</Typography>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <TextField
          required
          variant="filled"
          type="text"
          placeholder="Full Name"
          name="full_name"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={registerData?.full_name ?? ""}
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={registerData?.email ?? ""}
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={registerData?.phone_number ?? ""}
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={registerData?.password ?? ""}
          className={styles.input}
        />
        <TextField
          required
          variant="filled"
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={registerData?.confirm_password ?? ""}
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