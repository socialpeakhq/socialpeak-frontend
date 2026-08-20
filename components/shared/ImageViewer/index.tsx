import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import usePostStore from "@/stores/usePostStore";

type IProps = {
  image: string;
  index: number;
};

export default function ImageViewer({ image, index }: IProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const removeCreatePostMedia = usePostStore((s) => s.removeCreatePostMedia);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${styles.viewerContainer} ${hovered && styles.hoveredImage}`}
    >
      <Image
        width={50}
        height={50}
        src={image}
        alt="Image"
        className={styles.image}
      />
      {hovered && (
        <Box
          onClick={() => removeCreatePostMedia(index)}
          className={styles.closeButton}
        >
          <Close />
        </Box>
      )}
    </Box>
  );
}
