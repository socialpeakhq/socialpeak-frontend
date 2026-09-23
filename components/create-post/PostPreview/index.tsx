/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import usePostStore, { PostPlatform } from "@/stores/usePostStore";
import { formatDateTime } from "@/utils/helper.functions";
import { needsLetterbox, PLATFORM_LABEL, TYPE_CONFIG } from "../constants";
import { ChevronGlyph, PLATFORM_GLYPH } from "../icons";
import usePlatformAvailability from "../usePlatformAvailability";
import styles from "./styles.module.scss";

function PreviewCard({ platform }: { platform: PostPlatform }) {
  const { type, caption, link, media, scheduled, scheduleTime } = usePostStore(
    (s) => s.createPostData,
  );
  const account = usePlatformAvailability().platforms[platform].account;

  const [rawIndex, setRawIndex] = useState<number>(0);

  const config = TYPE_CONFIG[type];
  // Clamp so removing media never leaves the carousel past its last slide
  const currentIndex = Math.min(rawIndex, Math.max(media.length - 1, 0));
  const hasMultipleMedia = media.length > 1;

  const goTo = (index: number) =>
    setRawIndex((index + media.length) % media.length);

  const typeLabel =
    type === "video"
      ? platform === "instagram"
        ? "Reel"
        : "Video"
      : type === "story"
        ? "Story"
        : "Post";

  const showLink =
    platform === "facebook" && config.hasLink && link && media.length === 0;

  return (
    <Box className={styles.previewCard}>
      <Box className={styles.cardHead}>
        <Box className={styles.avatar} />
        <Box>
          <Box className={styles.accountName}>{account?.label}</Box>
          <Box className={styles.platformLabel}>
            {PLATFORM_GLYPH[platform]}
            {PLATFORM_LABEL[platform]} · {typeLabel}
          </Box>
        </Box>
      </Box>
      {config.hasCaption && (
        <Box className={styles.caption}>
          {caption || "Your caption will appear here"}
        </Box>
      )}
      {media.length > 0 && (
        <Box
          className={`${styles.media} ${type === "story" ? styles.story : ""}`}
        >
          <Box
            className={styles.slidesTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {media.map((item) => {
              const letterboxed =
                item.kind === "image" &&
                needsLetterbox(item.width, item.height);
              const src = item.kind === "video" ? item.thumbUrl : item.url;

              return (
                <Box
                  key={item.id}
                  className={`${styles.slide} ${letterboxed ? styles.letterboxed : ""}`}
                >
                  {src && <img src={src} alt="" />}
                </Box>
              );
            })}
          </Box>
          {hasMultipleMedia && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => goTo(currentIndex - 1)}
              >
                <ChevronGlyph direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={() => goTo(currentIndex + 1)}
              >
                <ChevronGlyph direction="right" />
              </button>
              <Box className={styles.carouselDots}>
                {media.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show item ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={index === currentIndex ? styles.activeDot : ""}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
      {showLink && (
        <Box className={`${styles.caption} ${styles.link}`}>{link}</Box>
      )}
      <Box className={styles.cardFoot}>
        {type !== "story" && scheduled
          ? scheduleTime
            ? `Scheduled · ${formatDateTime(dayjs.unix(scheduleTime).toISOString())}`
            : "Scheduled · pick a date and time"
          : "Publishing now"}
      </Box>
    </Box>
  );
}

export default function PostPreview() {
  const platforms = usePostStore((s) => s.createPostData.platforms);

  return (
    <Box className={styles.previewPanel}>
      <Box className={styles.label}>Preview</Box>
      {platforms.length === 0 ? (
        <Box className={styles.previewEmpty}>
          Select a platform to see how your post will look
        </Box>
      ) : (
        platforms.map((platform) => (
          <PreviewCard key={platform} platform={platform} />
        ))
      )}
    </Box>
  );
}
