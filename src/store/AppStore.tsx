import { create } from "zustand";

interface AppState {
  darkMode: boolean;
  changeMode: () => void;
}

const useStore = create<AppState>()((set) => ({
  darkMode: true,
  changeMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const useDarkMode = () => useStore((state) => state.darkMode);
export const useChangeMode = () => useStore((state) => state.changeMode);
