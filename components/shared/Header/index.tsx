'use client'

import { type ReactElement } from "react";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./styles.module.scss"
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/react-query/auth/auth.types";
import SearchIcon from '@mui/icons-material/Search';

export default function Header(): ReactElement {
  const auth: User | undefined = useQueryClient().getQueryData(['auth'])
  const full_name = auth?.full_name;
  const email = auth?.email
  return (
    <>
      {auth &&
        <Box className={styles.headerContainer}>
          <Box className={styles.searchContainer}>
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <Box className={styles.inputAdorment}>
                      <SearchIcon />
                    </Box>
                  )
                }
              }}
              placeholder="Search Your Dashboard..."
              className={styles.textfield}
            />
          </Box>
          <Box className={styles.accountContainer}>
            <Box className={styles.infoContainer}>
              <Typography className={styles.userName}>{full_name}</Typography>
              <Typography className={styles.emailLabel}>{email}</Typography>
            </Box>
            <Box className={styles.profileIconContainer}>
              <Typography className={styles.fullNameProfile}>{full_name?.split(" ")[0][0]}{full_name?.split(" ")[1][0]}</Typography>
            </Box>
          </Box>
        </Box>
      }
    </>
  )
}