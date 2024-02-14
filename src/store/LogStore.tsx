import { create } from "zustand";
import { LogFormChanges } from "../pages/types";

interface LogItem {
  day: string;
  morning_weight: number | null;
  night_weight: number | null;
  morning_notes: string;
  night_notes: string;
}

interface LogState {
  log: LogItem[] | null;
  setLog: (logArr: LogItem[] | null) => void;
  recentEntry: LogItem | null;
  setRecentEntry: (entry: LogItem) => void;
  unsavedChanges: LogFormChanges | null;
  setUnsavedChanges: (changes: LogFormChanges | null) => void;
  refreshLog: boolean;
  setRefreshLog: (s: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (s: Date) => void;
}

const useStore = create<LogState>()((set) => ({
  log: null,
  setLog: (logArr: LogItem[] | null) => set({ log: logArr }),
  recentEntry: null,
  setRecentEntry: (entry: LogItem) => set({ recentEntry: entry }),
  unsavedChanges: null,
  setUnsavedChanges: (changes: LogFormChanges | null) =>
    set({ unsavedChanges: changes }),
  refreshLog: false,
  setRefreshLog: (s: boolean) => set({ refreshLog: s }),
  selectedDate: null,
  setSelectedDate: (s: Date) => set({ selectedDate: s }),
}));

export const useLog = () => useStore((state) => state.log);
export const useSetLog = () => useStore((state) => state.setLog);
export const useRecentEntry = () => useStore((state) => state.recentEntry);
export const useSetRecentEntry = () =>
  useStore((state) => state.setRecentEntry);
export const useUnsavedChanges = () =>
  useStore((state) => state.unsavedChanges);
export const useSetUnsavedChanges = () =>
  useStore((state) => state.setUnsavedChanges);
export const useRefreshLog = () => useStore((state) => state.refreshLog);
export const useSetRefreshLog = () => useStore((state) => state.setRefreshLog);
export const useSelectedDate = () => useStore((state) => state.selectedDate);
export const useSetSelectedDate = () =>
  useStore((state) => state.setSelectedDate);
