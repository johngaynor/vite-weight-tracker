import { create } from "zustand";

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
}

const useStore = create<LogState>()((set) => ({
  log: null,
  setLog: (logArr: LogItem[] | null) => set({ log: logArr }),
  recentEntry: null,
  setRecentEntry: (entry: LogItem) => set({ recentEntry: entry }),
}));

export const useLog = () => useStore((state) => state.log);
export const useSetLog = () => useStore((state) => state.setLog);
export const useRecentEntry = () => useStore((state) => state.recentEntry);
export const useSetRecentEntry = () =>
  useStore((state) => state.setRecentEntry);
