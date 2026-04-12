import { mountStoreDevtool } from "simple-zustand-devtools";
import { RegisterUser } from "@/types/auth.types";
import { create } from "zustand";

type AuthStore = {
  isAuth: boolean;
  registerUserData: RegisterUser | undefined;

  setAuthentication: () => void;
  handleRegisterUserData: (name: string, value: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  registerUserData: undefined,

  setAuthentication: () => {
    set({ isAuth: true });
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
}));

mountStoreDevtool("Auth", useAuthStore);

export default useAuthStore;
