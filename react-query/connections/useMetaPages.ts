import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import {
  InstagramAccountOfPage,
  MetaAccountsReponse,
} from "./connections.type";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";

const returnApi = (id: number) => {
  return new APIClient<MetaAccountsReponse[]>(`meta/workspace/${id}/accounts`);
};

export const useMetaPages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => returnApi(id).getAll(),
    onSuccess: (data: MetaAccountsReponse[]) => {
      let newObject: Record<
        string,
        Record<
          number,
          | Omit<MetaAccountsReponse, "instagram_account">
          | InstagramAccountOfPage
        >
      > = {};

      data.forEach((page) => {
        const { instagram_account, ...restOfPage } = page;

        newObject = {
          ...newObject,
          ["facebook"]: {
            ...(newObject["facebook"] as unknown as Record<
              string,
              Omit<MetaAccountsReponse, "instagram_account">
            >),
            [restOfPage.page_id]: restOfPage,
          },
          ["instagram"]: {
            ...(newObject["instagram"] as unknown as Record<
              string,
              InstagramAccountOfPage
            >),
            [instagram_account.instagram_account_id]: instagram_account,
          },
        };
      });

      queryClient.setQueryData(META_ACCOUNTS_QUERY_KEY, newObject);
    },
  });
};
