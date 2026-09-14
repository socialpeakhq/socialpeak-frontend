import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

export type PostData = {
  platforms: string[];
  caption: string;
  link: string;
  media: string[] | string;
  scheduled: boolean;
  schedule_time?: string;
};

type PostStore = {
  createPostData?: Partial<PostData>;

  handleCreatePostDataChange: (value: string, name: keyof PostData) => void;
  handleCreatePostPlatforms: (value: string) => void;
  handleCreatePostMedia: (value: string, type: string) => void;
  removeCreatePostMedia: (value: number) => void;
};

const usePostStore = create<PostStore>((set) => ({
  createPostData: undefined,

  handleCreatePostDataChange: (value: string, name: keyof PostData) => {
    set((s) => {
      const currentPostData = s.createPostData;
      return {
        createPostData: { ...currentPostData, [name]: value },
      };
    });
  },
  handleCreatePostMedia: (value: string, type: string) => {
    set((s) => {
      const currentMedia = s.createPostData?.media;
      const media =
        type === "video"
          ? value
          : [...(Array.isArray(currentMedia) ? currentMedia : []), value];

      return {
        createPostData: { ...s.createPostData, media: media },
      };
    });
  },
  removeCreatePostMedia: (value: number) => {
    set((s) => {
      const newMedia = Array.isArray(s.createPostData?.media)
        ? s.createPostData.media.filter(
            (_item, index: number) => index !== value,
          )
        : "";
      return {
        createPostData: { ...s.createPostData, media: newMedia },
      };
    });
  },
  handleCreatePostPlatforms: (value: string) => {
    set((s) => {
      const currentPlatforms = s.createPostData?.platforms ?? [];
      const selectedPlatforms = currentPlatforms.includes(value)
        ? currentPlatforms.filter((item) => item !== value)
        : [...currentPlatforms, value];
      return {
        createPostData: { ...s.createPostData, platforms: selectedPlatforms },
      };
    });
  },
}));

mountStoreDevtool("Posts", usePostStore);

export default usePostStore;
