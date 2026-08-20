import { Box, TextareaAutosize, TextField } from "@mui/material";

import styles from "./styles.module.scss";
import usePostStore from "@/stores/usePostStore";

export default function CaptionLink() {
  const caption = usePostStore((s) => s.createPostData?.caption);
  const link = usePostStore((s) => s.createPostData?.link);

  const handleCreatePostChange = usePostStore(
    (s) => s.handleCreatePostDataChange,
  );

  return (
    <Box className={styles.captionLinkContainer}>
      <TextareaAutosize
        placeholder="Write a caption..."
        minRows={5}
        value={caption}
        onChange={(e) => handleCreatePostChange(e.target.value, "caption")}
        className={styles.textarea}
      />
      <TextField
        placeholder="Add a link (Facebook only)"
        value={link}
        onChange={(e) => handleCreatePostChange(e.target.value, "link")}
        size="small"
        className={styles.linkField}
      />
    </Box>
  );
}
