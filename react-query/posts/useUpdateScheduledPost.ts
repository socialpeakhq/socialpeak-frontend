import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { PostData } from "@/stores/usePostStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useDialogStore from "@/stores/useDialogStore";
import { fileToBase64 } from "@/utils/helper.functions";
import { PublicMediaUrlsResponse } from "./posts.type";

const apiClient = new APIClient("posts/schedule");
const uploadClient = new APIClient<PublicMediaUrlsResponse>(
  "/posts/media/upload-media",
);

export const useUpdateScheduledPost = () => {
  const workspace_id = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const queryClient = useQueryClient();
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number | string;
      data: PostData;
    }) => {
      const mediaToUpload = data.media.filter((item) => item.file);
      const uploadedUrls = mediaToUpload.length
        ? (
            await uploadClient.post(
              await Promise.all(
                mediaToUpload.map((item) =>
                  item.kind === "image"
                    ? item.url
                    : (fileToBase64(item.file as File) as Promise<string>),
                ),
              ),
            )
          ).data
        : [];

      let uploadedIndex = 0;
      const mediaUrls = data.media.map((item) =>
        item.file ? uploadedUrls[uploadedIndex++] : item.url,
      );

      return apiClient.patch({
        id,
        data: {
          caption: data.caption,
          title: data.title,
          link: data.link,
          platforms: data.platforms,
          media_urls: mediaUrls,
          scheduled_at: data.scheduleTime ?? undefined,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scheduled-posts", workspace_id],
      });
      closeDialog();
    },
  });
};
