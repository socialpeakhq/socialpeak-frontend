import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";

const returnApiClient = (workspace_id: number) => {
  return new APIClient(`posts/scheduled/${workspace_id}`);
};

export const useScheduledPosts = (workspace_id?: number) => {
  const response = useQuery({
    queryKey: ["scheduled-posts", workspace_id],
    queryFn: () => workspace_id && returnApiClient(workspace_id).getAll(),
    enabled: !!workspace_id,
  });

  return response;
};
