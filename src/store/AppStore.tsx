import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  changeMode: () => void;
  user: any | null;
  setUser: (user: any) => void;
}

const useStore = create<AppState>()((set) => ({
  darkMode: true,
  changeMode: () => set((state) => ({ darkMode: !state.darkMode })),
  user: null,
  setUser: (user: any) => set({ user }),
}));

export const useDarkMode = () => useStore((state) => state.darkMode);
export const useChangeMode = () => useStore((state) => state.changeMode);
export const useUser = () => useStore((state) => state.user);
export const useSetUser = () => useStore((state) => state.setUser);
