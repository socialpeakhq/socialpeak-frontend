import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export type PostType = "post" | "video" | "story";
export type PostPlatform = "facebook" | "instagram";
export type MediaKind = "image" | "video";

export type PostsTableFilter = {
  searchField: string;
  types: string;
  platforms: string;
  statuses: string;
  date: "7d" | "30d" | "90d" | "all";
};

export type PostMediaItem = {
  id: string;
  file: File;
  kind: MediaKind;
  url: string;
  width: number;
  height: number;
  thumbUrl?: string | null;
};

export type PostData = {
  type: PostType;
  platforms: PostPlatform[];
  caption: string;
  title: string;
  link: string;
  media: PostMediaItem[];
  scheduled: boolean;
  // unix timestamp in seconds, as the backend expects
  scheduleTime: number | null;
};

type PostTextField = "caption" | "title" | "link";

type PostStore = {
  createPostData: PostData;
  filters: PostsTableFilter;

  handleCreatePostDataChange: (value: string, name: PostTextField) => void;
  handleCreatePostType: (value: PostType) => void;
  handleCreatePostPlatforms: (value: PostPlatform) => void;
  removeCreatePostPlatform: (value: PostPlatform) => void;
  setCreatePostMedia: (value: PostMediaItem[]) => void;
  removeCreatePostMedia: (id: string) => void;
  handleCreatePostSchedule: (scheduled: boolean) => void;
  handleCreatePostScheduleTime: (value: number | null) => void;
  handleModifyFilters: <K extends keyof PostsTableFilter>(
    name: K,
    value: PostsTableFilter[K],
  ) => void;
};

const usePostStore = create<PostStore>((set) => ({
  createPostData: {
    type: "post",
    platforms: ["facebook", "instagram"],
    caption: "",
    title: "",
    link: "",
    media: [],
    scheduled: false,
    scheduleTime: null,
  },
  filters: {
    date: "all",
    platforms: "all",
    searchField: "",
    statuses: "all",
    types: "all",
  },

  handleCreatePostDataChange: (value: string, name: PostTextField) => {
    set((s) => ({
      createPostData: { ...s.createPostData, [name]: value },
    }));
  },
  handleCreatePostType: (value: PostType) => {
    // different types need different media — start clean
    set((s) => ({
      createPostData: { ...s.createPostData, type: value, media: [] },
    }));
  },
  handleCreatePostPlatforms: (value: PostPlatform) => {
    set((s) => {
      const currentPlatforms = s.createPostData.platforms;
      const selectedPlatforms = currentPlatforms.includes(value)
        ? currentPlatforms.filter((item) => item !== value)
        : [...currentPlatforms, value];
      return {
        createPostData: { ...s.createPostData, platforms: selectedPlatforms },
      };
    });
  },
  removeCreatePostPlatform: (value: PostPlatform) => {
    set((s) => ({
      createPostData: {
        ...s.createPostData,
        platforms: s.createPostData.platforms.filter((item) => item !== value),
      },
    }));
  },
  setCreatePostMedia: (value: PostMediaItem[]) => {
    set((s) => ({
      createPostData: { ...s.createPostData, media: value },
    }));
  },
  removeCreatePostMedia: (id: string) => {
    set((s) => ({
      createPostData: {
        ...s.createPostData,
        media: s.createPostData.media.filter((item) => item.id !== id),
      },
    }));
  },
  handleCreatePostSchedule: (scheduled: boolean) => {
    set((s) => ({
      createPostData: { ...s.createPostData, scheduled },
    }));
  },
  handleCreatePostScheduleTime: (value: number | null) => {
    set((s) => ({
      createPostData: { ...s.createPostData, scheduleTime: value },
    }));
  },
  handleModifyFilters: <K extends keyof PostsTableFilter>(
    name: K,
    value: PostsTableFilter[K],
  ) => {
    set((s) => {
      const currentFilter = { ...s.filters };
      currentFilter[name] = value;
      return {
        filters: currentFilter,
      };
    });
  },
}));

mountStoreDevtool("Posts", usePostStore);

export default usePostStore;
