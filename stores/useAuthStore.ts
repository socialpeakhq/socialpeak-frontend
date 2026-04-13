import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist } from "zustand/middleware";
import { RegisterUser } from "@/types/auth.types";
import { create, StateCreator } from "zustand";

type AuthStore = {
  isAuth: boolean;
  token: string | undefined;
  registerUserData: RegisterUser | undefined;

  setAuthentication: (payload: string) => void;
  handleRegisterUserData: (name: string, value: string) => void;
};

const authStore: StateCreator<AuthStore, [["zustand/persist", unknown]]> = (
  set,
) => ({
  isAuth: false,
  registerUserData: undefined,
  token: undefined,

  setAuthentication: (payload: string) => {
    set({ isAuth: true, token: payload });
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
  }),
);

export default useAuthStore;
