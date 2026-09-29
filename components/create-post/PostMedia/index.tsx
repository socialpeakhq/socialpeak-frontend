/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import { DragEvent, useRef, useState } from "react";
import {
  fileToBase64,
  getImageDimensions,
  getVideoMetadata,
} from "@/utils/helper.functions";
import usePostStore, {
  PostDataKey,
  PostMediaItem,
} from "@/stores/usePostStore";
import { needsLetterbox, TYPE_CONFIG } from "../constants";
import { CloseGlyph, UploadGlyph } from "../icons";
import styles from "./styles.module.scss";

const measureFile = async (
  file: File,
): Promise<Omit<PostMediaItem, "id" | "file">> => {
  if (file.type.startsWith("video")) {
    const url = URL.createObjectURL(file);
    return { kind: "video", url, ...(await getVideoMetadata(url)) };
  }

  const url = (await fileToBase64(file)) as string;
  const dimensions = await getImageDimensions(url).catch(() => ({
    width: 1080,
    height: 1080,
  }));
  return { kind: "image", url, ...dimensions };
};

type IProps = {
  dataKey?: PostDataKey;
};

export default function PostMedia({ dataKey = "createPostData" }: IProps) {
  const { type, media } = usePostStore((s) => s[dataKey]);
  const setCreatePostMedia = usePostStore((s) => s.setCreatePostMedia);
  const removeCreatePostMedia = usePostStore((s) => s.removeCreatePostMedia);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const config = TYPE_CONFIG[type];

  const addFiles = async (fileList: FileList | null) => {
    for (const file of Array.from(fileList ?? [])) {
      const kind = file.type.startsWith("video") ? "video" : "image";
      if (!config.kinds.includes(kind)) continue;

      const item: PostMediaItem = {
        id: Math.random().toString(36).slice(2),
        file,
        ...(await measureFile(file)),
      };

      const currentMedia = usePostStore.getState()[dataKey].media;
      if (!config.multiple || item.kind !== "image") {
        setCreatePostMedia([item], dataKey);
      } else if (currentMedia.length < config.maxItems) {
        setCreatePostMedia([...currentMedia, item], dataKey);
      }
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>, active: boolean) => {
    event.preventDefault();
    setDragging(active);
  };

  return (
    <>
      <Box className={styles.fieldLabel}>
        {type === "post" ? "Media (optional)" : "Media"}
      </Box>
      {media.length < config.maxItems && (
        <Box
          className={`${styles.dropzone} ${dragging ? styles.drag : ""}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => handleDrag(e, true)}
          onDragEnter={(e) => handleDrag(e, true)}
          onDragLeave={(e) => handleDrag(e, false)}
          onDrop={(e) => {
            handleDrag(e, false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <UploadGlyph />
          <Box className={styles.dropzoneText}>{config.dropText}</Box>
          <Box className={styles.dropzoneSub}>{config.dropSub}</Box>
          <input
            ref={fileInputRef}
            type="file"
            accept={config.accept}
            multiple={config.multiple}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
            className={styles.fileInput}
          />
        </Box>
      )}
      {media.length > 0 && (
        <Box className={styles.mediaGrid}>
          {media.map((item) => {
            const showPad =
              item.kind === "image" && needsLetterbox(item.width, item.height);
            const isVideo = item.kind === "video";

            return (
              <Box
                key={item.id}
                className={`${styles.mediaThumb} ${isVideo ? styles.videoThumb : ""} ${showPad ? styles.letterboxed : ""}`}
              >
                {showPad && (
                  <span className={styles.padBadge}>
                    Padded
                    <span className={styles.tooltipBubble}>
                      This will be padded to fit the 4:5–1.91:1 range — the
                      original isn&apos;t cropped.
                    </span>
                  </span>
                )}
                {isVideo ? (
                  <video
                    src={item.thumbUrl ? item.url : `${item.url}#t=0.1`}
                    poster={item.thumbUrl ?? undefined}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={item.url} alt="" />
                )}
                {isVideo && <span className={styles.videoBadge}>Video</span>}
                <button
                  type="button"
                  className={styles.mediaRemove}
                  onClick={() => removeCreatePostMedia(item.id, dataKey)}
                >
                  <CloseGlyph />
                </button>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
