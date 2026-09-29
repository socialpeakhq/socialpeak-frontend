import { Box } from "@mui/material";
import usePostStore, { PostDataKey } from "@/stores/usePostStore";
import { TYPE_CONFIG } from "../constants";
import styles from "./styles.module.scss";

type IProps = {
  dataKey?: PostDataKey;
};

export default function CaptionLink({ dataKey = "createPostData" }: IProps) {
  const { type, caption, title, link, media, platforms } = usePostStore(
    (s) => s[dataKey],
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
            onChange={(e) => handleCreatePostChange(e.target.value, "caption", dataKey)}
            className={styles.caption}
          />
          {showTitle && (
            <input
              type="text"
              placeholder="Title (used on Facebook video)"
              value={title}
              onChange={(e) =>
                handleCreatePostChange(e.target.value, "title", dataKey)
              }
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
          onChange={(e) =>
            handleCreatePostChange(e.target.value, "link", dataKey)
          }
          className={styles.textInput}
        />
      )}
    </>
  );
}
