import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import usePostStore, { PostPlatform } from "@/stores/usePostStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { fileToBase64 } from "@/utils/helper.functions";
import { Post, PostResponse, PublicMediaUrlsResponse } from "./posts.type";

const uploadClient = new APIClient<PublicMediaUrlsResponse>(
  "/posts/media/upload-media",
);
const postClient = new APIClient<PostResponse>("/posts");
const videoClient = new APIClient<PostResponse>("/posts/video");
const storyClient = new APIClient<PostResponse>("/posts/story");

export const usePublishPost = () => {
  const queryClient = useQueryClient();
  const selectedWorkspace = useWorkspaceStore(
    (s) => s.selectedWorkspace,
  )?.workspace_id;

  return useMutation({
    mutationFn: async (platforms: PostPlatform[]): Promise<Post> => {
      const { type, caption, title, link, media, scheduled, scheduleTime } =
        usePostStore.getState().createPostData;

      const schedule =
        scheduled && scheduleTime
          ? { published: false, isScheduled: true, scheduled_at: scheduleTime }
          : {};

      const encodedMedia = await Promise.all(
        media.map(async (item) =>
          item.kind === "image"
            ? item.url
            : ((await fileToBase64(item.file)) as string),
        ),
      );
      const mediaUrls = encodedMedia.length
        ? (await uploadClient.post(encodedMedia)).data
        : undefined;

      if (type === "video") {
        const response = await videoClient.post({
          workspace_id: selectedWorkspace,
          file_url: mediaUrls?.[0],
          description: caption,
          title,
          platforms,
          ...schedule,
        });
        return response.data;
      }

      if (type === "story") {
        const response = await storyClient.post({
          workspace_id: selectedWorkspace,
          caption: "",
          media_urls: mediaUrls,
          platforms,
        });
        return response.data;
      }

      const response = await postClient.post({
        workspace_id: selectedWorkspace,
        caption,
        media_urls: mediaUrls,
        link: link && !mediaUrls ? link : undefined,
        platforms,
        ...schedule,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-list"] });
    },
  });
};
