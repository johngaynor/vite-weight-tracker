import { create } from "zustand";

interface LoadingState {
  logLoading: boolean;
  setLogLoading: (s: boolean) => void;
  saveLogLoading: boolean;
  setSaveLogLoading: (s: boolean) => void;
}

const useStore = create<LoadingState>()((set) => ({
  logLoading: false,
  setLogLoading: (s: boolean) => set({ logLoading: s }),
  saveLogLoading: false,
  setSaveLogLoading: (s: boolean) => set({ saveLogLoading: s }),
}));

export const useLogLoading = () => useStore((state) => state.logLoading);
export const useSetLogLoading = () => useStore((state) => state.setLogLoading);
export const useSaveLogLoading = () =>
  useStore((state) => state.saveLogLoading);
export const useSetSaveLogLoading = () =>
  useStore((state) => state.setSaveLogLoading);
