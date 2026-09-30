"use client";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../../../assets/images/peak.svg";
import { useLogin } from "@/react-query/auth/useLogin";
import styles from "./styles.module.scss";
import { SubmitEvent, useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const loginMuation = useLogin();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleClick = () => {
    router.push("/signup");
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMuation.mutate(loginData);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.iconContainer}>
        <Logo width={64} height={64} className={styles.icon} />
      </Box>
      <Typography className={styles.formLabel}>Sign In</Typography>
      <Typography className={styles.subLabel}>
        Enter your credentials to access your account
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <TextField
          required
          id="email"
          variant="filled"
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={styles.input}
        />
        <TextField
          required
          id="password"
          variant="filled"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={styles.input}
        />
        <Box className={styles.row}>
          <Box className={styles.rememberGroup}>
            <Checkbox className={styles.checkbox} />
            <Typography className={styles.label}>Remember Me</Typography>
          </Box>
          <Typography className={styles.forgotPassword}>
            Forgot password?
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          className={styles.signInButton}
        >
          Sign In <ArrowForwardIcon />
        </Button>
        <Box className={styles.footerContainer}>
          <Typography className={styles.footerLabel}>
            Don&apos;t have an account?
          </Typography>
          <Typography
            onClick={handleClick}
            className={styles.createAccountLabel}
          >
            Create one now
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
