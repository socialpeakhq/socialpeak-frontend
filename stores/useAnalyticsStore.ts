import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export type PlatformValues = "all" | "facebook" | "instagram";
export type PostType = "all" | "post" | "reel" | "story";
export type PeriodType = 7 | 30 | 90;

export type FilterState = {
  platform: PlatformValues;
  type: PostType;
  period: PeriodType;
};

type AnalyticsStore = {
  filter: FilterState;

  handleFilterChange: <T extends keyof FilterState>(
    name: T,
    value: FilterState[T],
  ) => void;
};

const DEFAULT_FILTER: FilterState = {
  period: 7,
  platform: "all",
  type: "all",
};

const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  filter: DEFAULT_FILTER,

  handleFilterChange: <T extends keyof FilterState>(
    name: T,
    value: FilterState[T],
  ) => {
    set((s) => {
      const currentFilter = { ...s.filter };
      currentFilter[name] = value;
      return {
        filter: currentFilter,
      };
    });
  },
}));

mountStoreDevtool("Analytics", useAnalyticsStore);

export default useAnalyticsStore;
