/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";

type IProps = {
  images?: string[] | string;
};

type Orientation = "portrait" | "landscape";

const ASPECT_RATIO: Record<Orientation, string> = {
  portrait: "4 / 5",
  landscape: "1.91 / 1",
};

const VIDEO_EXTENSIONS = [".mp4", ".mov"];

const isVideo = (src: string) => {
  const path = src.split(/[?#]/)[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((extension) => path.endsWith(extension));
};

const getOrientation = (width: number, height: number): Orientation =>
  width > height ? "landscape" : "portrait";

export default function ImageCarousel({ images }: IProps) {
  const imageList = useMemo(
    () => (Array.isArray(images) ? images : images ? [images] : []),
    [images],
  );
  const [rawIndex, setRawIndex] = useState(0);
  const [orientations, setOrientations] = useState<Record<number, Orientation>>(
    {},
  );

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const setOrientation = (index: number, orientation: Orientation) =>
    setOrientations((prev) => ({ ...prev, [index]: orientation }));

  useEffect(() => {
    imageList.forEach((src, index) => {
      if (isVideo(src)) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () =>
          setOrientation(
            index,
            getOrientation(video.videoWidth, video.videoHeight),
          );
        video.src = src;
        return;
      }

      const image = new Image();
      image.onload = () =>
        setOrientation(
          index,
          getOrientation(image.naturalWidth, image.naturalHeight),
        );
      image.src = src;
    });
  }, [imageList]);

  const currentIndex = Math.min(rawIndex, Math.max(imageList.length - 1, 0));

  // Pause any video that is no longer the visible slide
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([index, video]) => {
      if (video && Number(index) !== currentIndex) video.pause();
    });
  }, [currentIndex]);

  if (!imageList.length) return null;

  const hasMultipleImages = imageList.length > 1;
  const currentOrientation = orientations[currentIndex] ?? "landscape";

  const goToPrevious = () =>
    setRawIndex(currentIndex === 0 ? imageList.length - 1 : currentIndex - 1);
  const goToNext = () =>
    setRawIndex(currentIndex === imageList.length - 1 ? 0 : currentIndex + 1);

  return (
    <Box
      className={styles.carouselContainer}
      style={{ aspectRatio: ASPECT_RATIO[currentOrientation] }}
    >
      <Box
        className={styles.slidesTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((src, index) => (
          <Box className={styles.slide} key={index}>
            {isVideo(src) ? (
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                src={src}
                controls
                playsInline
                preload="metadata"
                className={styles.video}
              />
            ) : (
              <img
                src={src}
                alt={`Post image ${index + 1}`}
                sizes="(max-width: 600px) 100vw, 500px"
                className={styles.image}
              />
            )}
          </Box>
        ))}
      </Box>

      {hasMultipleImages && (
        <>
          <Box className={styles.counter}>
            {currentIndex + 1}/{imageList.length}
          </Box>

          <Box
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
          >
            <ChevronLeft />
          </Box>
          <Box
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
          >
            <ChevronRight />
          </Box>

          <Box className={styles.dotsContainer}>
            {imageList.map((_, index) => (
              <Box
                key={index}
                onClick={() => setRawIndex(index)}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
