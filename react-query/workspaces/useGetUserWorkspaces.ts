import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { Workspace } from "./workspace.type";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

const apiClient = new APIClient<Workspace[]>(`/workspace`);

export const useGetUserWorkspaces = () => {
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setSelectedWorkspace);
  const response = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => apiClient.getAll(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (response.isSuccess) {
      const data = response.data;
      if (data && data[0]) {
        setCurrentWorkspace(data[0]);
      }
    }
  }, [response.isSuccess, response.data, setCurrentWorkspace]);
};

export const useRefreshUserWorkspaces = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["workspaces"] });
};
