import { create } from "zustand";

interface LoadingState {
  logLoading: boolean;
  saveLogLoading: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  setLogLoading: (s: boolean) => void;
  setSaveLogLoading: (s: boolean) => void;
  setLoginLoading: (s: boolean) => void;
  setRegisterLoading: (s: boolean) => void;
  setLogoutLoading: (s: boolean) => void;
}

const useStore = create<LoadingState>()((set) => ({
  logLoading: false,
  saveLogLoading: false,
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  setLogLoading: (s: boolean) => set({ logLoading: s }),
  setSaveLogLoading: (s: boolean) => set({ saveLogLoading: s }),
  setLoginLoading: (s: boolean) => set({ loginLoading: s }),
  setRegisterLoading: (s: boolean) => set({ registerLoading: s }),
  setLogoutLoading: (s: boolean) => set({ logoutLoading: s }),
}));

export const useLogLoading = () => useStore((state) => state.logLoading);
export const useSetLogLoading = () => useStore((state) => state.setLogLoading);
export const useSaveLogLoading = () =>
  useStore((state) => state.saveLogLoading);
export const useSetSaveLogLoading = () =>
  useStore((state) => state.setSaveLogLoading);
export const useLoginLoading = () => useStore((state) => state.loginLoading);
export const useSetLoginLoading = () =>
  useStore((state) => state.setLoginLoading);
export const useRegisterLoading = () =>
  useStore((state) => state.registerLoading);
export const useSetRegisterLoading = () =>
  useStore((state) => state.setRegisterLoading);
export const useLogoutLoading = () => useStore((state) => state.logoutLoading);
export const useSetLogoutLoading = () =>
  useStore((state) => state.setLogoutLoading);
