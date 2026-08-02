export type MetaAccountsReponse = {
  facebook_page_id: number;
  page_id: number;
  page_name: string;
  updated_at: string;
  instagram_account: InstagramAccountOfPage;
};

export type InstagramAccountOfPage = {
  instagram_account_id: number;
  name: string;
  username: string;
};

export type MetaPlatformInsight = {
  id: number;
  facebook_page_id: number;
  platform: string;
  metric: string;
  value: number;
  captured_at: Date;
  created_at: Date;
};

export type MetaAccountsData = Record<
  string,
  Record<number, MetaAccountsDataType>
>;

export type MetaAccountsDataType = {
  id: number;
  facebook_page_id: number;
  name: string;
  label: string;
  updated_at?: Date;
};
