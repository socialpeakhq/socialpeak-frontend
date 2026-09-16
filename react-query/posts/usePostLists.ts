import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { Post } from "./posts.type";

const returnApiClient = (workspace_id: number) => {
  return new APIClient<Post[]>(`posts/list/${workspace_id}`);
};

export const usePostLists = (workspace_id?: number) => {
  const response = useQuery({
    queryKey: ["posts-list", workspace_id],
    queryFn: () => workspace_id && returnApiClient(workspace_id).getAll(),
    enabled: !!workspace_id,
  });

  return response;
};
