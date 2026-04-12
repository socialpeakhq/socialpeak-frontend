import { StateCreator } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { RegisterUser } from "@/types/auth.types";

type AuthStore = {
  isAuth: boolean;
  registerUserData: RegisterUser | undefined;

  setAuthentication: () => void;
  handleRegisterUserData: (name: string, value: string) => void;
};

const useAuthStore: StateCreator<AuthStore> = (set) => ({
  isAuth: false,
  registerUserData: undefined,
  setAuthentication: () => {
    set(() => ({
      isAuth: true,
    }));
  },
  handleRegisterUserData: (name: string, value: string) => {
    set((s) => {
      const currentData = s.registerUserData || {};
      return {
        registerUserData: { ...currentData, [name]: value } as RegisterUser,
      };
    });
  },
});

mountStoreDevtool("Auth", useAuthStore);
