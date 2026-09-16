import { useMutation } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { usePublishPost } from "./usePublishPost";
import { PublicMediaUrlsResponse } from "./posts.type";

const apiClient = new APIClient<PublicMediaUrlsResponse>(
  "/posts/media/upload-media",
);

export const useUploadMediaToUrl = () => {
  const { mutate: publishPost } = usePublishPost();
  return useMutation({
    mutationFn: (media: string[]) => apiClient.post(media),
    onSuccess: (successData: PublicMediaUrlsResponse) => {
      publishPost(successData.data);
    },
  });
};
