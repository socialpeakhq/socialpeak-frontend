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
  file?: File;
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
  scheduleTime: number | null;
};

type PostTextField = "caption" | "title" | "link";

export type PostDataKey = "createPostData" | "editPostData";

type PostStore = {
  createPostData: PostData;
  editPostData: PostData;
  filters: PostsTableFilter;

  handleCreatePostDataChange: (
    value: string,
    name: PostTextField,
    key?: PostDataKey,
  ) => void;
  handleCreatePostType: (value: PostType, key?: PostDataKey) => void;
  handleCreatePostPlatforms: (value: PostPlatform, key?: PostDataKey) => void;
  removeCreatePostPlatform: (value: PostPlatform, key?: PostDataKey) => void;
  setCreatePostMedia: (value: PostMediaItem[], key?: PostDataKey) => void;
  removeCreatePostMedia: (id: string, key?: PostDataKey) => void;
  handleCreatePostSchedule: (scheduled: boolean, key?: PostDataKey) => void;
  handleCreatePostScheduleTime: (
    value: number | null,
    key?: PostDataKey,
  ) => void;
  setEditPostData: (value: PostData) => void;
  handleModifyFilters: <K extends keyof PostsTableFilter>(
    name: K,
    value: PostsTableFilter[K],
  ) => void;
};

export const EMPTY_POST_DATA: PostData = {
  type: "post",
  platforms: ["facebook", "instagram"],
  caption: "",
  title: "",
  link: "",
  media: [],
  scheduled: false,
  scheduleTime: null,
};

const usePostStore = create<PostStore>((set) => ({
  createPostData: EMPTY_POST_DATA,
  editPostData: EMPTY_POST_DATA,
  filters: {
    date: "all",
    platforms: "all",
    searchField: "",
    statuses: "all",
    types: "all",
  },

  handleCreatePostDataChange: (
    value: string,
    name: PostTextField,
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => ({
      [key]: { ...s[key], [name]: value },
    }));
  },
  handleCreatePostType: (
    value: PostType,
    key: PostDataKey = "createPostData",
  ) => {
    // different types need different media — start clean
    set((s) => ({
      [key]: { ...s[key], type: value, media: [] },
    }));
  },
  handleCreatePostPlatforms: (
    value: PostPlatform,
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => {
      const currentPlatforms = s[key].platforms;
      const selectedPlatforms = currentPlatforms.includes(value)
        ? currentPlatforms.filter((item) => item !== value)
        : [...currentPlatforms, value];
      return {
        [key]: { ...s[key], platforms: selectedPlatforms },
      };
    });
  },
  removeCreatePostPlatform: (
    value: PostPlatform,
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => ({
      [key]: {
        ...s[key],
        platforms: s[key].platforms.filter((item) => item !== value),
      },
    }));
  },
  setCreatePostMedia: (
    value: PostMediaItem[],
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => ({
      [key]: { ...s[key], media: value },
    }));
  },
  removeCreatePostMedia: (id: string, key: PostDataKey = "createPostData") => {
    set((s) => ({
      [key]: {
        ...s[key],
        media: s[key].media.filter((item) => item.id !== id),
      },
    }));
  },
  handleCreatePostSchedule: (
    scheduled: boolean,
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => ({
      [key]: { ...s[key], scheduled },
    }));
  },
  handleCreatePostScheduleTime: (
    value: number | null,
    key: PostDataKey = "createPostData",
  ) => {
    set((s) => ({
      [key]: { ...s[key], scheduleTime: value },
    }));
  },
  setEditPostData: (value: PostData) => {
    set({ editPostData: value });
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
