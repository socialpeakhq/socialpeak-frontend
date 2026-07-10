export type MetaAccountsReponse = {
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
