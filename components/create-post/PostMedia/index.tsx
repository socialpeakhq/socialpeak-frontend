import { Box, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ChangeEvent } from "react";
import { fileToBase64 } from "@/utils/helper.functions";
import usePostStore from "@/stores/usePostStore";
import styles from "./styles.module.scss";
import ImageViewer from "@/components/shared/ImageViewer";

export default function PostMedia() {
  const media = usePostStore((s) => s.createPostData?.media);
  const handleCreatePostMedia = usePostStore((s) => s.handleCreatePostMedia);

  const handleFiles = async (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) return;

    const uploadedFiles = (await Promise.all(
      selectedFiles.map(async (file) => await fileToBase64(file)),
    )) as string[];

    if (!uploadedFiles) return;

    if (Array.isArray(uploadedFiles)) {
      uploadedFiles.forEach((file) => handleCreatePostMedia(file, "image"));
    } else {
      handleCreatePostMedia(uploadedFiles, "image");
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
