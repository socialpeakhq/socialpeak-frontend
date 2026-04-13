/* eslint-disable @typescript-eslint/no-explicit-any */
import useAlertStore from "@/stores/useAlertStore";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

// axiosInstance.interceptors.request.use(
//   (request: InternalAxiosRequestConfig) => {
//     const token = useAuthStore.getState().token;

//     request.headers.set("Authorization", `Bearer ${token}`);
//     request.headers.set("Accept", "application/json");

//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { response } = err;
    const { data } = response;
    const { error, message } = data;

    const openAlert = useAlertStore.getState().openAlert;
    if (!response) {
      openAlert({ message: "Network Error", severity: "error" });
    }

    console.log(data);

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
