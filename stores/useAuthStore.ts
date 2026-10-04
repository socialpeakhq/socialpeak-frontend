import { mountStoreDevtool } from "simple-zustand-devtools";
import { createJSONStorage, persist } from "zustand/middleware";
import { RegisterUser } from "@/types/auth.types";
import {
  clearAuthSessionCookie,
  setAuthSessionCookie,
} from "@/lib/authSessionCookie";
import { createRememberAwareStorage } from "@/lib/authStorage";
import { create, StateCreator } from "zustand";

type AuthStore = {
  isAuth: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
  rememberMe: boolean;
  registerUserData: RegisterUser | undefined;

  setAuthentication: (
    token: string,
    refreshToken: string,
    rememberMe?: boolean,
  ) => void;
  clearAuthentication: () => void;
  handleRegisterUserData: (name: string, value: string) => void;
};

const authStore: StateCreator<AuthStore, [["zustand/persist", unknown]]> = (
  set,
  get,
) => ({
  isAuth: false,
  registerUserData: undefined,
  token: undefined,
  refreshToken: undefined,
  rememberMe: false,

  setAuthentication: (
    token: string,
    refreshToken: string,
    rememberMe?: boolean,
  ) => {
    set((s) => ({
      isAuth: true,
      token,
      refreshToken,
      rememberMe: rememberMe ?? s.rememberMe,
    }));
    setAuthSessionCookie(get().rememberMe);
  },

  clearAuthentication: () => {
    set({
      isAuth: false,
      token: undefined,
      refreshToken: undefined,
      rememberMe: false,
    });
    clearAuthSessionCookie();
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
    storage: createJSONStorage(() =>
      createRememberAwareStorage(window.localStorage, window.sessionStorage),
    ),
    onRehydrateStorage: () => (state) => {
      if (state?.token) {
        setAuthSessionCookie(state.rememberMe);
      }
    },
  }),
);

mountStoreDevtool("Auth", useAuthStore);

export default useAuthStore;
