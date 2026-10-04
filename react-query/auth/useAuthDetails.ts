import { QueryKey, useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { User } from "./auth.types";
import useAuthStore from "@/stores/useAuthStore";

export const AUTH_QUERY_KEY: QueryKey = ["auth"];

const apiClient = new APIClient<User>(`/auth/auth-details`);

// Loads the logged-in user from the stored token (sent as the Bearer header by
// apiClient). Login/signup prime this query's cache, so it only hits the API
// on a fresh page load. An expired token goes through the 401 -> refresh ->
// retry flow in apiClient, and lands on /login if the refresh fails.
export const useAuthDetails = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery<User>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => apiClient.getAll(),
    enabled: !!token,
  });
};
