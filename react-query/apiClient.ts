/* eslint-disable @typescript-eslint/no-explicit-any */
import useAlertStore from "@/stores/useAlertStore";
import useAuthStore from "@/stores/useAuthStore";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AUTH_ENDPOINTS = ["/auth/login", "/auth/signup", "/auth/refresh"];

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    request.headers.set("Authorization", `Bearer ${token}`);
    request.headers.set("Accept", "application/json");

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const res = await axios.post(
    "/auth/refresh",
    { refresh_token: refreshToken },
    { baseURL: process.env.NEXT_PUBLIC_BACKEND_API },
  );

  const { access_token, refresh_token } = res.data.data;
  useAuthStore.getState().setAuthentication(access_token, refresh_token);
  return access_token;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const { response, config } = err;
    const openAlert = useAlertStore.getState().openAlert;

    if (!response) {
      openAlert({ message: "Network Error", severity: "error" });
      return Promise.reject(err);
    }

    const requestConfig = config as RetryableRequestConfig | undefined;
    const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) =>
      requestConfig?.url?.includes(endpoint),
    );

    if (
      response.status === 401 &&
      requestConfig &&
      !isAuthEndpoint &&
      !requestConfig._retry
    ) {
      requestConfig._retry = true;
      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newAccessToken = await refreshPromise;
        requestConfig.headers.set("Authorization", `Bearer ${newAccessToken}`);
        return axiosInstance(requestConfig);
      } catch {
        // No refresh token means this tab never had a session (e.g. a new tab
        // of a non-remembered login, whose sessionStorage starts empty).
        // Clearing would drop the shared session cookie and log out the
        // tabs that do have one, so only send this tab to /login.
        if (useAuthStore.getState().refreshToken) {
          useAuthStore.getState().clearAuthentication();
        }
        openAlert({
          message: "Your session has expired. Please log in again.",
          severity: "error",
        });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    const { data } = response;
    const { error, message } = data;

    openAlert({
      message: `${error} : ${message}`,
      severity: "error",
    });

    return Promise.reject(error);
  },
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /** get single*/
  get = (config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };
  getById = (id?: string) => {
    return axiosInstance
      .get<T>(this.endpoint + "?" + id)
      .then((res) => res.data);
  };
  getByIdParams = (payload: string | number) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + payload)
      .then((res) => res.data);
  };

  // getPaginatedById = (id?: number, config?: AxiosRequestConfig) => {
  //   return axiosInstance
  //     .get<PaginatedData<T>>(this.endpoint + "/" + id, config)
  //     .then((res) => res.data);
  // };

  /** get multiple*/
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<any>(this.endpoint, config)
      .then((res) => res.data.data);
  };

  // getAllPaginated = (config: AxiosRequestConfig) => {
  //   return axiosInstance
  //     .get<PaginatedData<T>>(this.endpoint, config)
  //     .then((res) => res.data);
  // };

  // /** post */
  // postAllPaginated = (config: AxiosRequestConfig) => {
  //   return axiosInstance
  //     .post<PaginatedData<T>>(this.endpoint, config)
  //     .then((res) => res.data);
  // };

  post = (payload?: any) => {
    return axiosInstance
      .post<T>(this.endpoint, payload)
      .then((res) => res.data);
  };

  /** update */
  patch = (payload: { id: number | string; data: T }) => {
    return axiosInstance.patch<T>(
      this.endpoint + "/" + payload.id,
      payload.data,
    );
  };
  put = (payload: any) => {
    return axiosInstance.put<T>(this.endpoint, payload);
  };
  putById = (payload: { id: number | string; data: T }) => {
    return axiosInstance.patch<T>(
      this.endpoint + "/" + payload.id,
      payload.data,
    );
  };
  /** delete */
  delete = (payload: string | number) => {
    return axiosInstance
      .delete<any>(this.endpoint + "/" + payload)
      .then((res) => res.data);
  };
  deleteItem = (payload: any) => {
    return axiosInstance.delete(this.endpoint, payload);
  };
}

export default APIClient;
