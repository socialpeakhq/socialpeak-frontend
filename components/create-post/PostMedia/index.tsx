import { Box, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ChangeEvent } from "react";
import { fileToBase64, getImageDimensions } from "@/utils/helper.functions";
import usePostStore from "@/stores/usePostStore";
import useAlertStore from "@/stores/useAlertStore";
import styles from "./styles.module.scss";
import ImageViewer from "@/components/shared/ImageViewer";

// Instagram's supported range for feed images: 4:5 (portrait) to 1.91:1 (landscape)
const MIN_ASPECT_RATIO = 0.8;
const MAX_ASPECT_RATIO = 1.91;

export default function PostMedia() {
  const media = usePostStore((s) => s.createPostData?.media);
  const handleCreatePostMedia = usePostStore((s) => s.handleCreatePostMedia);
  const openAlert = useAlertStore((s) => s.openAlert);

  const handleFiles = async (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) return;

    const uploadedFiles = (await Promise.all(
      selectedFiles.map(async (file) => await fileToBase64(file)),
    )) as string[];

    if (!uploadedFiles) return;

    for (const file of uploadedFiles) {
      const { width, height } = await getImageDimensions(file);
      const aspectRatio = width / height;

      if (aspectRatio < MIN_ASPECT_RATIO || aspectRatio > MAX_ASPECT_RATIO) {
        openAlert({
          message: `This image's aspect ratio isn't supported by Instagram — it'll be padded with white bars to fit.`,
          severity: "info",
        });
      }

      handleCreatePostMedia(file, "image");
    }
  };

  return (
    <Box className={styles.mediaContainer}>
      <Box className={styles.mediaInputContainer}>
        <Box className={styles.mediaContent}>
          <Box className={styles.icon}>
            <FileUploadIcon />
          </Box>
          <Typography className={styles.label}>Upload Files</Typography>
          <Typography className={styles.helperLabel}>
            Up to 10 photos for a carousel, or 1 video
          </Typography>
        </Box>
        <input
          accept="image/*"
          type="file"
          multiple
          onChange={handleFiles}
          className={styles.mediaInput}
        />
      </Box>
      <Box className={styles.selectedImages}>
        {media &&
          (Array.isArray(media) ? (
            media.map((image: string, index: number) => {
              return <ImageViewer index={index} image={image} key={index} />;
            })
          ) : (
            <ImageViewer index={0} image={media} />
          ))}
      </Box>
    </Box>
  );
}
