import { skipToken, useQuery } from "@tanstack/react-query";
import {
  MetaAccountsData,
  MetaAccountsDataType,
} from "@/react-query/connections/connections.type";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";
import usePostStore, { PostDataKey, PostPlatform } from "@/stores/usePostStore";
import { PLATFORM_KEYS } from "./constants";

type PlatformAvailability = {
  account?: MetaAccountsDataType;
  disabledReason: string | null;
};

export default function usePlatformAvailability(
  dataKey: PostDataKey = "createPostData",
): {
  loaded: boolean;
  platforms: Record<PostPlatform, PlatformAvailability>;
} {
  const { data: metaAccounts } = useQuery<MetaAccountsData>({
    queryKey: META_ACCOUNTS_QUERY_KEY,
    queryFn: skipToken,
  });

  const type = usePostStore((s) => s[dataKey].type);
  const firstMedia = usePostStore((s) => s[dataKey].media[0]);

  const facebookSupportsCurrentMedia = !(
    type === "story" && firstMedia?.kind === "video"
  );

  const platforms = PLATFORM_KEYS.reduce(
    (acc, platform) => {
      const account = metaAccounts?.[platform]
        ? Object.values(metaAccounts[platform])[0]
        : undefined;

      let disabledReason: string | null = null;
      if (!account) disabledReason = "Not connected";
      else if (platform === "facebook" && !facebookSupportsCurrentMedia)
        disabledReason = "Doesn't support video Stories";

      acc[platform] = { account, disabledReason };
      return acc;
    },
    {} as Record<PostPlatform, PlatformAvailability>,
  );

  return { loaded: Boolean(metaAccounts), platforms };
}
