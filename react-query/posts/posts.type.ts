export type PublicMediaUrlsResponse = {
  statusCode: number;
  message: "Success";
  data: string[];
};

export type Post = {
  caption: string;
  created_at: string;
  facebook_page_id: number;
  id: number;
  media_urls: string[];
  workspace_id: number;
  targets: PostTarget[];
  type: string;
};

export type PostTarget = {
  error_message: null | string;
  external_post_id: string;
  id: number;
  platform: string;
  post_id: number;
  published_at: string;
  status: string;
};

export type PostResponse = {
  statusCode: number;
  message: string;
  data: Post;
};
