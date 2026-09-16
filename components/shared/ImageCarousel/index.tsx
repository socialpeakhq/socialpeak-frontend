/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

type IProps = {
  images?: string[] | string;
};

type Orientation = "portrait" | "landscape";

const ASPECT_RATIO: Record<Orientation, string> = {
  portrait: "4 / 5",
  landscape: "1.91 / 1",
};

export default function ImageCarousel({ images }: IProps) {
  const imageList = useMemo(
    () => (Array.isArray(images) ? images : images ? [images] : []),
    [images],
  );
  const [rawIndex, setRawIndex] = useState(0);
  const [orientations, setOrientations] = useState<Record<number, Orientation>>(
    {},
  );

  useEffect(() => {
    imageList.forEach((src, index) => {
      const image = new Image();
      image.onload = () => {
        setOrientations((prev) => ({
          ...prev,
          [index]:
            image.naturalWidth > image.naturalHeight ? "landscape" : "portrait",
        }));
      };
      image.src = src;
    });
  }, [imageList]);

  if (!imageList.length) return null;

  const hasMultipleImages = imageList.length > 1;
  const currentIndex = Math.min(rawIndex, imageList.length - 1);
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
        {imageList.map((image, index) => (
          <Box className={styles.slide} key={index}>
            <img
              src={image}
              alt={`Post image ${index + 1}`}
              sizes="(max-width: 600px) 100vw, 500px"
              className={styles.image}
            />
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
