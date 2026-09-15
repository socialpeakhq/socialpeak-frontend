import { useMutation } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { usePublishPost } from "./usePublishPost";

type Response = {
  statusCode: number;
  message: "Success";
  data: string[];
};

const apiClient = new APIClient<Response>("/posts/media/upload-media");

export const useUploadMediaToUrl = () => {
  const { mutate: publishPost } = usePublishPost();
  return useMutation({
    mutationFn: (media: string[]) => apiClient.post(media),
    onSuccess: (successData: Response) => {
      publishPost(successData.data);
    },
  });
};
