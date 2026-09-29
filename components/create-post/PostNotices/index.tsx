import { Box } from "@mui/material";
import usePostStore, { PostDataKey } from "@/stores/usePostStore";
import { needsLetterbox } from "../constants";
import { WarningGlyph } from "../icons";
import styles from "./styles.module.scss";

type Notice = { text: string; level: "warn" | "info" };

type IProps = {
  dataKey?: PostDataKey;
};

export default function PostNotices({ dataKey = "createPostData" }: IProps) {
  const { type, media, platforms } = usePostStore((s) => s[dataKey]);
  const hasInstagram = platforms.includes("instagram");

  const notices: Notice[] = [];

  if (type === "post" && media.length === 0 && hasInstagram) {
    notices.push({
      text: "Instagram requires at least one photo for a Post — text/link-only posts are Facebook only.",
      level: "warn",
    });
  }
  if (type === "story" && media[0]?.kind === "video") {
    notices.push({
      text: "Facebook only supports photo Stories today, so this will publish to Instagram only.",
      level: "info",
    });
  }
  if (
    media.some(
      (item) =>
        item.kind === "image" && needsLetterbox(item.width, item.height),
    )
  ) {
    notices.push({
      text: "One or more images fall outside the 4:5–1.91:1 range — they'll be padded automatically, not cropped or rejected.",
      level: "info",
    });
  }

  if (!notices.length) return null;

  return (
    <Box className={styles.noticeList}>
      {notices.map((notice) => (
        <Box
          key={notice.text}
          className={`${styles.notice} ${notice.level === "info" ? styles.info : ""}`}
        >
          <WarningGlyph />
          <span>{notice.text}</span>
        </Box>
      ))}
    </Box>
  );
}
