import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { Post } from "./posts.type";

const returnApiClient = (workspace_id: number) => {
  return new APIClient<Post[]>(`posts/list/${workspace_id}`);
};

export const usePostLists = (
  workspace_id?: number,
  options?: { refetchInterval?: (posts?: Post[]) => number | false },
) => {
  const refetchInterval = options?.refetchInterval;
  const response = useQuery({
    queryKey: ["posts-list", workspace_id],
    queryFn: () => workspace_id && returnApiClient(workspace_id).getAll(),
    enabled: !!workspace_id,
    refetchInterval: refetchInterval
      ? (query) => refetchInterval(query.state.data || undefined)
      : undefined,
  });

  return response;
};
