import { Box, Button, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import TikTok from "@ant-design/icons/TikTokOutlined";
import styles from "./styles.module.scss";

const platforms = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    description: "Schedule Page posts and reply to messages",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    description: "Publish posts, stories, and reply to DMs",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    description: "Manage customer chats in one inbox",
  },
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
        {platforms.map(({ name, icon: Icon, description }) => (
          <Box key={name} className={styles.card}>
            <Box className={styles.cardIcon}>
              <Icon />
            </Box>
            <Typography className={styles.cardTitle}>{name}</Typography>
            <Typography className={styles.cardDescription}>
              {description}
            </Typography>
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
