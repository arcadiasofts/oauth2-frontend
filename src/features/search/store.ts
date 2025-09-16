import { create } from "zustand";

interface SearchBarState {
  isOpen: boolean;
  query: string;
  setIsOpen: (isOpen: boolean) => void;
  setQuery: (query: string) => void;
}

export const useSearchBar = create<SearchBarState>((set) => ({
  isOpen: false,
  query: "",
  setIsOpen: (isOpen) => set({ isOpen }),
  setQuery: (query) => set({ query }),
}));
