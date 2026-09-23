import { Box } from "@mui/material";
import usePostStore from "@/stores/usePostStore";
import { TYPE_CONFIG } from "../constants";
import styles from "./styles.module.scss";

export default function CaptionLink() {
  const { type, caption, title, link, media, platforms } = usePostStore(
    (s) => s.createPostData,
  );
  const handleCreatePostChange = usePostStore(
    (s) => s.handleCreatePostDataChange,
  );

  const config = TYPE_CONFIG[type];
  const hasFacebook = platforms.includes("facebook");
  const showTitle = config.hasTitle && hasFacebook;
  const showLink = config.hasLink && media.length === 0 && hasFacebook;

  return (
    <>
      {config.hasCaption && (
        <Box className={styles.captionBlock}>
          <Box className={styles.fieldLabel}>
            Caption
            <span className={styles.fieldHint}>
              {caption.length} characters
            </span>
          </Box>
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => handleCreatePostChange(e.target.value, "caption")}
            className={styles.caption}
          />
          {showTitle && (
            <input
              type="text"
              placeholder="Title (used on Facebook video)"
              value={title}
              onChange={(e) => handleCreatePostChange(e.target.value, "title")}
              className={styles.textInput}
            />
          )}
        </Box>
      )}
      {showLink && (
        <input
          type="text"
          placeholder="Add a link (Facebook only, no media)"
          value={link}
          onChange={(e) => handleCreatePostChange(e.target.value, "link")}
          className={styles.textInput}
        />
      )}
    </>
  );
}
