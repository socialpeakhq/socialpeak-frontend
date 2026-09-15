import { useMutation } from "@tanstack/react-query";
import APIClient from "../apiClient";
import usePostStore from "@/stores/usePostStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

const apiClient = new APIClient("/posts");

export const usePublishPost = () => {
  const createPostData = usePostStore((s) => s.createPostData);
  const selectedWorkspace = useWorkspaceStore(
    (s) => s.selectedWorkspace,
  )?.workspace_id;

  return useMutation({
    mutationFn: (media_urls: string[]) => {
      const payload = {
        workspace_id: selectedWorkspace,
        caption: createPostData?.caption,
        media_urls: media_urls,
        platforms: createPostData?.platforms,
      };
      return apiClient.post(payload);
    },
    onSuccess: (successData) => {
      console.log(successData);
    },
  });
};
