import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Workspace } from "@/react-query/workspaces/workspace.type";

type WorkspaceStore = {
  selectedWorkspace: Workspace | undefined;
  selectedPlatform: string;

  setSelectedWorkspace: (id: Workspace) => void;
  clearSelectedWorkspace: () => void;
  setSelectedPlatform: (value: string) => void;
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspace: undefined,
  selectedPlatform: "instagram",

  setSelectedWorkspace: (id: Workspace) => {
    set(() => ({
      selectedWorkspace: id,
    }));
  },

  clearSelectedWorkspace: () => {
    set(() => ({
      selectedWorkspace: undefined,
    }));
  },

  setSelectedPlatform: (value: string) => {
    set(() => ({
      selectedPlatform: value,
    }));
  },
}));

mountStoreDevtool("Workspace", useWorkspaceStore);
export default useWorkspaceStore;
