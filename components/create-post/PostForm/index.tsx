"use client";

import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { MetaAccountsData } from "@/react-query/connections/connections.type";
import { MAIN_PLATFORMS } from "@/pages/dashboard/constants";

export default function PostForm() {
  const metaAccounts: MetaAccountsData | undefined =
    useQueryClient().getQueryData(["meta-accounts"]);

  return (
    <Box className={styles.formContainer}>
      <Box className={styles.container}>
        <Typography className={styles.label}>Post To</Typography>
        <Box className={styles.platforms}>
          {metaAccounts &&
            Object.keys(metaAccounts).map((el) => {
              const item = metaAccounts[el];
              const key = Object.keys(item)[0];
              const singlePlatform = Object.values(item)[0];
              return (
                <Box key={key} className={styles.singlePlatform}>
                  <Box className={styles.iconContainer}>
                    {MAIN_PLATFORMS.find((item) => item.platform === el)?.icon}
                  </Box>
                  <Box className={styles.labelsContainer}>
                    <Typography className={styles.platformLabel}>
                      {el[0].toUpperCase() + el.substring(1)}
                    </Typography>
                    <Typography className={styles.usernameLabel}>
                      {singlePlatform.label}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
