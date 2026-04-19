/* eslint-disable @next/next/no-img-element */
import { type ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Link from "next/link";
import Navigation from "../Navigarion";
import styles from "./styles.module.scss"
import RecentMessages from "../RecentMessages";

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
      <RecentMessages />
      <Navigation />
      <Link href="/app/settings">
        <Box className={styles.sidebarFooter}>
          <Box className={styles.icon}>
            <SettingsOutlinedIcon />
          </Box>
          <Typography className={styles.settingsLabel}>Settings</Typography>
        </Box>
      </Link>
    </Box>
  )
}