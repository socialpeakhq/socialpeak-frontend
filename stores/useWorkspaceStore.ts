import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Workspace } from "@/react-query/workspaces/workspace.type";

type WorkspaceStore = {
  selectedWorkspace: Workspace | undefined;

  setSelectedWorkspace: (id: Workspace) => void;
  clearSelectedWorkspace: () => void;
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspace: undefined,

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
}));

mountStoreDevtool("Workspace", useWorkspaceStore);
export default useWorkspaceStore;
