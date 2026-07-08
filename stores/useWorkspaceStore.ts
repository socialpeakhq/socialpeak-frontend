import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type WorkspaceStore = {
  selectedWorkspace: number | undefined;

  setSelectedWorkspace: (id: number) => void;
  clearSelectedWorkspace: () => void;
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspace: undefined,

  setSelectedWorkspace: (id: number) => {
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
