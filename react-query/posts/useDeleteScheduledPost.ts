import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useDialogStore from "@/stores/useDialogStore";

const apiClient = new APIClient("posts/schedule");

export const useDeleteScheduledPost = () => {
  const queryClient = useQueryClient();
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  return useMutation({
    mutationFn: (id: number | string) => apiClient.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scheduled-posts", workspaceId],
      });
      closeDialog();
    },
  });
};
