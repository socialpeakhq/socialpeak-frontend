import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type OpenAlertPayload = {
  message: string;
  severity: "error" | "warning" | "info" | "success" | undefined;
  autoHideDuration?: number;
};

type AlertStore = {
  open: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success" | undefined;
  autoHideDuration: number;

  openAlert: (payload: OpenAlertPayload) => void;

  hideAlert: () => void;
};

const useAlertStore = create<AlertStore>((set) => ({
  autoHideDuration: 2000,
  message: "",
  open: false,
  severity: undefined,

  openAlert: (payload: OpenAlertPayload) => {
    set(() => ({
      autoHideDuration: payload.autoHideDuration,
      message: payload.message,
      severity: payload.severity,
      open: true,
    }));
  },
  hideAlert: () => {
    set(() => ({
      autoHideDuration: 5000,
      message: "",
      open: false,
      severity: undefined,
    }));
  },
}));

mountStoreDevtool("Alert", useAlertStore);

export default useAlertStore;
