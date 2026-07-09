import APIClient from "../apiClient";
import { useMutation } from "@tanstack/react-query";
import { useMetaPages } from "./useMetaPages";
import useAlertStore from "@/stores/useAlertStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useDialogStore from "@/stores/useDialogStore";

type ConnectResponse = {
  url: string;
};

type MetaOAuthMessage = {
  source: "meta-oauth";
  linked: boolean;
  workspace_id?: number;
  pages?: unknown[];
  error?: string;
  error_description?: string;
};

const BACKEND_ORIGIN = new URL(process.env.NEXT_PUBLIC_BACKEND_API!).origin;

const returnApi = (id: number) => {
  return new APIClient<ConnectResponse>(`/meta/connect?workspace_id=${id}`);
};

const openMetaConnectPopup = (url: string): Promise<MetaOAuthMessage> => {
  return new Promise((resolve, reject) => {
    const left = (window.innerWidth - 720) / 2;
    const top = (window.innerHeight - 900) / 2;
    const popup = window.open(
      url,
      "PopupWindow",
      `width=720,height=900,left=${left},top=${top}`,
    );

    if (!popup) {
      reject(new Error("Popup blocked. Please allow popups for this site."));
      return;
    }

    const cleanup = () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(pollClosed);
    };

    const handleMessage = (event: MessageEvent<MetaOAuthMessage>) => {
      if (
        event.origin !== BACKEND_ORIGIN ||
        event.data?.source !== "meta-oauth"
      ) {
        return;
      }

      cleanup();
      if (event.data.linked) {
        resolve(event.data);
      } else {
        reject(
          new Error(
            event.data.error_description ?? "Failed to connect Meta account",
          ),
        );
      }
    };

    const pollClosed = setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error("Connection window was closed before completing."));
      }
    }, 500);

    window.addEventListener("message", handleMessage);
  });
};

export const useMetaConnections = () => {
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const openAlert = useAlertStore((s) => s.openAlert);
  const metaPagesMutation = useMetaPages();
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return useMutation({
    mutationFn: async (id: number) => {
      const { url } = await returnApi(id).getAll();
      return openMetaConnectPopup(url);
    },
    onSuccess: () => {
      openAlert({ message: "Meta account connected", severity: "success" });
      if (selectedWorkspace) metaPagesMutation.mutate(selectedWorkspace);
      closeDialog();
    },
    onError: (error) => {
      openAlert({
        message:
          error instanceof Error
            ? error.message
            : "Failed to connect Meta account",
        severity: "error",
      });
    },
  });
};
