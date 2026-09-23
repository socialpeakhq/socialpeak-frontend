export const formatDateTime = (iso: string): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const getImageDimensions = (
  dataUrl: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
};

export const getVideoMetadata = (
  objectUrl: string,
): Promise<{ width: number; height: number; thumbUrl: string | null }> => {
  const fallback = { width: 1080, height: 1920, thumbUrl: null };

  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;

    // Grab an early frame to use as the thumbnail
    const captureFrame = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || fallback.width;
        canvas.height = video.videoHeight || fallback.height;
        canvas
          .getContext("2d")
          ?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve({
          width: canvas.width,
          height: canvas.height,
          thumbUrl: canvas.toDataURL("image/jpeg", 0.75),
        });
      } catch {
        resolve(fallback);
      }
    };

    video.onloadedmetadata = () => {
      try {
        video.currentTime = Math.min(0.15, (video.duration || 1) / 2);
      } catch {
        captureFrame();
      }
    };
    video.onseeked = captureFrame;
    video.onerror = () => resolve(fallback);
    video.src = objectUrl;
  });
};
