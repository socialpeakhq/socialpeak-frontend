import { useMutation } from "@tanstack/react-query";
import APIClient from "../apiClient";

const apiClient = new APIClient("/posts/media/upload-media");

export const useUploadMediaToUrl = () => {
  return useMutation({
    mutationFn: (media: string[]) => apiClient.post(media),
    onSuccess: (successData) => {
      console.log(successData);
    },
  });
};
