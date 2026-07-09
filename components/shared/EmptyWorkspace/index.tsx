"use client";

import React, { ReactElement, type ElementType, type ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import TikTok from "@ant-design/icons/TikTokOutlined";
import styles from "./styles.module.scss";

type Platform = {
  name: string;
  icon: ReactNode | ElementType;
  description: string;
};

const platforms: Platform[] = [
  {
    name: "Meta ( Facebook, What's App, Messenger, Instagram )",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path d="M640 317.9c0 91.3-39.4 148.5-110.3 148.5-62.6 0-95.8-34.6-156.9-136.6l-31.4-52.6c-8.3-12.5-14.5-24.2-21.2-35-20.1 33.8-47.1 83-47.1 83-67 116.6-104.6 141.2-156.9 141.2-72.8 0-116.2-57.3-116.2-145.9 0-143 79.8-278.1 183.9-278.1 50.2 0 93.8 24.7 144.8 89.5 37.1-50.1 78.1-89.5 130.6-89.5 99.1 0 180.7 125.7 180.7 275.5zM287.4 192.2c-42.9-62.1-70.9-80.5-104.4-80.5-61.9 0-113.8 106.1-113.8 210 0 48.5 18.5 75.7 49.6 75.7 30.2 0 49-19 103.2-103.8 0 0 24.7-39.1 65.4-101.4zM531.2 397.4c32.2 0 46.9-27.5 46.9-74.9 0-124.2-54.3-225.4-123.2-225.4-33.2 0-61.1 25.9-94.9 78 9.4 13.8 19.1 29 29.3 45.4l37.5 62.4c58.7 94.1 73.5 114.5 104.4 114.5z" />
      </svg>
    ),
    description: "Your most frequented pages, all in one",
  },
  // {
  //   name: "Instagram",
  //   icon: InstagramIcon,
  //   description: "Publish posts, stories, and reply to DMs",
  // },
  // {
  //   name: "WhatsApp",
  //   icon: WhatsAppIcon,
  //   description: "Manage customer chats in one inbox",
  // },
  {
    name: "X",
    icon: XIcon,
    description: "Post updates and track mentions",
  },
  {
    name: "TikTok",
    icon: TikTok,
    description: "Schedule videos and watch comments",
  },
];

const connectedCount = 0;

function renderPlatformIcon(icon: Platform["icon"]): ReactElement {
  return React.isValidElement(icon)
    ? icon
    : React.createElement(icon as ElementType);
}

export default function EmptyWorkspace() {
  return (
    <Box className={styles.emptyWorkspaceContainer}>
      <Box className={styles.connectedBadge}>
        <Typography component="span" className={styles.connectedBadgeCount}>
          {connectedCount}
        </Typography>
        <Typography component="span">
          &nbsp;/ {platforms.length} accounts connected
        </Typography>
      </Box>

      <Typography className={styles.title}>
        Connect your first account
      </Typography>
      <Typography className={styles.subtitle}>
        Link a channel to start scheduling posts, replying to messages, and
        tracking analytics — all from this dashboard.
      </Typography>

      <Box className={styles.cardsContainer}>
        {platforms.map(({ name, icon, description }) => (
          <Box key={name} className={styles.card}>
            <Box className={styles.cardContent}>
              <Box className={styles.cardIcon}>{renderPlatformIcon(icon)}</Box>
              <Typography className={styles.cardTitle}>{name}</Typography>
              <Typography className={styles.cardDescription}>
                {description}
              </Typography>
            </Box>
            <Button variant="outlined" className={styles.connectButton}>
              Connect
            </Button>
          </Box>
        ))}
      </Box>

      <Typography className={styles.footerLabel}>
        Takes about a minute per platform. You can disconnect anytime from
        Settings.
      </Typography>
    </Box>
  );
}
