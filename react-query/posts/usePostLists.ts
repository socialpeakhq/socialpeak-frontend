import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { Post } from "./posts.type";

const returnApiClient = (workspace_id: number, searchParams?: string) => {
  if (searchParams) {
    return new APIClient<Post[]>(`posts/list/${workspace_id}?${searchParams}`);
  }
  return new APIClient<Post[]>(`posts/list/${workspace_id}`);
};

export const usePostLists = (
  workspace_id?: number,
  searchParams?: string,
  options?: { refetchInterval?: (posts?: Post[]) => number | false },
) => {
  const refetchInterval = options?.refetchInterval;
  const response = useQuery({
    queryKey: ["posts-list", workspace_id, searchParams],
    queryFn: () =>
      workspace_id && returnApiClient(workspace_id, searchParams).getAll(),
    enabled: !!workspace_id,
    refetchInterval: refetchInterval
      ? (query) => refetchInterval(query.state.data || undefined)
      : undefined,
  });

  return response;
};
