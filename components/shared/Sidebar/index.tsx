/* eslint-disable @next/next/no-img-element */
import { type ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss"
import Link from "next/link";
import Navigation from "../Navigarion";

export default function Sidebar(): ReactElement {
  return (
    <Box className={styles.sidebarContainer}>
      <Link href='/app/dashboard'>
        <Box className={styles.logoContainer}>
          <img
            src="/logo.svg"
            alt="Application Logo : Social Peak"
            className={styles.socialPeakImage}
          />
          <Typography className={styles.subtitle}>Manage & Grow</Typography>
        </Box>
      </Link>
      <Navigation />
    </Box>
  )
}