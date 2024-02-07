import { create } from "zustand";

interface AppState {
  count: number;
  incrCount: (by: number) => void;
  decrCount: (by: number) => void;
  darkMode: boolean;
  changeMode: () => void;
}

const useStore = create<AppState>()((set) => ({
  count: 0,
  incrCount: (by) => set((state) => ({ count: state.count + by })),
  decrCount: (by) => set((state) => ({ count: state.count - by })),
  darkMode: false,
  changeMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const useCount = () => useStore((state) => state.count);
export const useDecrCount = () => useStore((state) => state.decrCount);
export const useIncrCount = () => useStore((state) => state.incrCount);
export const useDarkMode = () => useStore((state) => state.darkMode);
export const useChangeMode = () => useStore((state) => state.changeMode);
