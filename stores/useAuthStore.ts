import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import { RegisterUser } from "@/types/auth.types";
import { syncAuthTokenCookie } from "@/lib/syncAuthTokenCookie";
import { create, StateCreator } from "zustand";

type AuthStore = {
  isAuth: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
  registerUserData: RegisterUser | undefined;

  setAuthentication: (token: string, refreshToken: string) => void;
  clearAuthentication: () => void;
  handleRegisterUserData: (name: string, value: string) => void;
};

const authStore: StateCreator<AuthStore, [["zustand/persist", unknown]]> = (
  set,
) => ({
  isAuth: false,
  registerUserData: undefined,
  token: undefined,
  refreshToken: undefined,

  setAuthentication: (token: string, refreshToken: string) => {
    set({ isAuth: true, token, refreshToken });
    syncAuthTokenCookie(token);
  },

  clearAuthentication: () => {
    set({ isAuth: false, token: undefined, refreshToken: undefined });
    syncAuthTokenCookie(undefined);
  },

  handleRegisterUserData: (name: string, value: string) => {
    set((s) => {
      const currentData = s.registerUserData || {};
      return {
        registerUserData: {
          ...currentData,
          [name]: value,
        } as RegisterUser,
      };
    });
  },
});

const useAuthStore = create<AuthStore>()(
  persist(authStore, {
    name: "auth",
    onRehydrateStorage: () => (state) => {
      if (state?.token) {
        syncAuthTokenCookie(state.token);
      }
    },
  }),
);

mountStoreDevtool("Auth", useAuthStore);

export default useAuthStore;
