import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import {
  InstagramAccountOfPage,
  MetaAccountsData,
  MetaAccountsReponse,
} from "../connections/connections.type";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";

const returnApi = (id: number) => {
  return new APIClient<MetaAccountsReponse[]>(`meta/workspace/${id}/accounts`);
};

export const useMetaPages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => returnApi(id).getAll(),
    onSuccess: (data: MetaAccountsReponse[]) => {
      let newObject: MetaAccountsData = {};

      data.forEach((page) => {
        const pageWithFacebookId = page as MetaAccountsReponse & {
          facebook_page_id?: number;
          instagram_account: InstagramAccountOfPage;
        };
        const { instagram_account, ...restOfPage } = pageWithFacebookId;

        newObject = {
          ...newObject,
          ["facebook"]: {
            ...(newObject["facebook"] as unknown as Record<
              string,
              Omit<MetaAccountsReponse, "instagram_account">
            >),
            [restOfPage.page_id]: {
              id: restOfPage.page_id,
              facebook_page_id: restOfPage.facebook_page_id,
              label: restOfPage.page_name,
              name: restOfPage.page_name,
              updated_at: restOfPage.updated_at,
            },
          },
          ["instagram"]: {
            ...(newObject["instagram"] as unknown as Record<
              string,
              InstagramAccountOfPage
            >),
            [instagram_account.instagram_account_id]: {
              id: instagram_account.instagram_account_id,
              facebook_page_id: restOfPage.facebook_page_id,
              label: "@" + instagram_account.username,
              name: instagram_account.name,
            },
          },
        };
      });

      queryClient.setQueryData(META_ACCOUNTS_QUERY_KEY, newObject);
    },
  });
};
