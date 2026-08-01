import { type ReactElement } from "react";
import { Box, Typography } from "@mui/material";

import styles from "./styles.module.scss";
import { NAVIGATION_LINKS } from "./consts";
import Link from "next/link";

export default function Navigation(): ReactElement {
  return (
    <Box className={styles.navigationContainer}>
      <Box className={styles.navigations}>
        {NAVIGATION_LINKS.map((navigation) => (
          <Link key={navigation.id} href={navigation.path}>
            <Box className={styles.singleNavigation}>
              <Box className={styles.iconContainer}>{<navigation.icon />}</Box>
              <Typography className={styles.navigationLabel}>
                {navigation.label}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
