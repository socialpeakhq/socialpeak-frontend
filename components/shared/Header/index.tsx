'use client'

import { type ReactElement, useSyncExternalStore } from "react";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./styles.module.scss"
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/react-query/auth/auth.types";
import SearchIcon from '@mui/icons-material/Search';
import { AUTH_QUERY_KEY } from "@/lib/authQueryPersistence";

export default function Header(): ReactElement {
  const queryClient = useQueryClient();
  const auth = useSyncExternalStore(
    (onStoreChange) => queryClient.getQueryCache().subscribe(onStoreChange),
    () => queryClient.getQueryData<User>(AUTH_QUERY_KEY),
    () => undefined,
  );

  if (!auth) {
    return <></>;
  }

  const full_name = auth?.full_name;
  const email = auth?.email
  const initials = full_name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
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
          <Typography className={styles.fullNameProfile}>{initials}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
