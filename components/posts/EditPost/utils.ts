import dayjs from "dayjs";
import { ScheduledPost } from "@/components/shared/Schedule/utils";
import usePostStore, {
  MediaKind,
  PostData,
  PostMediaItem,
  PostType,
} from "@/stores/usePostStore";
import {
  getImageDimensions,
  getVideoMetadata,
} from "@/utils/helper.functions";

const VIDEO_EXTENSION = /\.(mp4|mov|m4v|webm)(\?|#|$)/i;

// the backend stores videos as "reel"
const toPostType = (type: string): PostType => {
  if (type === "story" || type === "post") return type;
  return "video";
};

const getMediaKind = (url: string, type: PostType): MediaKind => {
  if (type === "video" || VIDEO_EXTENSION.test(url)) return "video";
  return "image";
};

const toUnix = (value: ScheduledPost["scheduled_at"]) =>
  typeof value === "number" ? value : dayjs(value).unix();

export const mapScheduledPostToPostData = (post: ScheduledPost): PostData => {
  const type = toPostType(post.type);

  return {
    type,
    platforms: post.platforms,
    caption: post.caption ?? "",
    title: post.metadata?.title ?? post.title ?? "",
    link: post.metadata?.link ?? "",
    media: (post.media_urls ?? []).map((url, index) => ({
      id: `${post.id}-${index}`,
      kind: getMediaKind(url, type),
      url,
      // measured after the dialog opens — see measureEditPostMedia
      width: 0,
      height: 0,
    })),
    scheduled: true,
    scheduleTime: toUnix(post.scheduled_at),
  };
};

const measure = async (item: PostMediaItem) => {
  if (item.kind === "video") return getVideoMetadata(item.url);
  return getImageDimensions(item.url).catch(() => ({
    width: 1080,
    height: 1080,
  }));
};

// Remote media arrives without dimensions, which the padding notice/badge need
export const measureEditPostMedia = async (media: PostMediaItem[]) => {
  await Promise.all(
    media.map(async (item) => {
      const measured = await measure(item);

      // Read fresh state — the item may have been removed in the meantime
      const { editPostData, setCreatePostMedia } = usePostStore.getState();
      setCreatePostMedia(
        editPostData.media.map((current) =>
          current.id === item.id ? { ...current, ...measured } : current,
        ),
        "editPostData",
      );
    }),
  );
};
