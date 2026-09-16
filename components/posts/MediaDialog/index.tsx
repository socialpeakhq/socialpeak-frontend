import { Box, Typography } from "@mui/material";
import useDialogStore from "@/stores/useDialogStore";
import ImageCarousel from "@/components/shared/ImageCarousel";
import styles from "./styles.module.scss";

export type MediaDialogPayload = {
  postId: number;
  media: string[];
};

function useMediaDialogContent(): MediaDialogPayload | undefined {
  return useDialogStore((s) => s.dialogContent) as
    | MediaDialogPayload
    | undefined;
}

export function MediaDialogHeader() {
  const content = useMediaDialogContent();
  const count = content?.media.length ?? 0;

  return (
    <Box className={styles.headerContainer}>
      <Typography className={styles.titleLabel}>Media</Typography>
      <Typography className={styles.subtitleLabel}>
        #{content?.postId} · {count} item{count === 1 ? "" : "s"}
      </Typography>
    </Box>
  );
}

export function MediaDialogContent() {
  const content = useMediaDialogContent();
  const media = content?.media ?? [];

  if (media.length === 0) {
    return (
      <Typography className={styles.emptyLabel}>
        No media for this post
      </Typography>
    );
  }

  return (
    <Box className={styles.carouselContainer}>
      <ImageCarousel images={media} />
    </Box>
  );
}
