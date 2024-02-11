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
  setLog: (logArr: LogItem[]) => void;
}

const useStore = create<LogState>()((set) => ({
  log: null,
  setLog: (logArr: LogItem[]) => set({ log: logArr }),
}));

export const useLog = () => useStore((state) => state.log);
export const useSetLog = () => useStore((state) => state.setLog);
