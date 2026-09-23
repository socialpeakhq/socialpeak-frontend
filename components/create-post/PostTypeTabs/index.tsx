import { Box } from "@mui/material";
import usePostStore from "@/stores/usePostStore";
import { POST_TYPES, TYPE_CONFIG } from "../constants";
import { TYPE_GLYPH } from "../icons";
import styles from "./styles.module.scss";

export default function PostTypeTabs() {
  const type = usePostStore((s) => s.createPostData.type);
  const handleCreatePostType = usePostStore((s) => s.handleCreatePostType);

  return (
    <Box className={styles.typeTabs}>
      {POST_TYPES.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleCreatePostType(key)}
          className={`${styles.typeTab} ${type === key ? styles.on : ""}`}
        >
          {TYPE_GLYPH[key]}
          <span className={styles.typeName}>{TYPE_CONFIG[key].label}</span>
        </button>
      ))}
    </Box>
  );
}
