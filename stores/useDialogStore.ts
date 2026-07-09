import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type OpenDialogPayload<T> = {
  dialogCaller: string;
  dialogContent?: T;
};

type DialogStore = {
  open: boolean;
  dialogContent: unknown;
  dialogCaller: string;

  openDialog: <T>(payload: OpenDialogPayload<T>) => void;
  closeDialog: () => void;
};

const useDialogStore = create<DialogStore>((set) => ({
  open: false,
  dialogContent: undefined,
  dialogCaller: "",
  openDialog: <T>(payload: OpenDialogPayload<T>) => {
    set({
      open: true,
      dialogContent: payload.dialogContent,
      dialogCaller: payload.dialogCaller,
    });
  },
  closeDialog: () => {
    set({ open: false, dialogCaller: "", dialogContent: undefined });
  },
}));

mountStoreDevtool("Dialog", useDialogStore);

export default useDialogStore;
