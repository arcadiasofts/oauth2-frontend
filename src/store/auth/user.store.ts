import { create } from "zustand";

interface UserStore {
  user: UserType;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: UserType) => void;
  completeLoading: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    nickname: "",
    handle: "",
    profile: {
      "16": "",
      "64": "",
      "256": "",
      "512": "",
    },
    authority: 0,
  },
  isLoggedIn: false,
  isLoading: true,
  setUser: (user: UserType) => {
    set({
      user,
      isLoggedIn: true,
    });
  },
  completeLoading: () => {
    set({ isLoading: false });
  },
}));
