import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
export const apiClient = axios.create({
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((req) => {
  const authUser = {};
  req.baseURL = baseUrl;
  console.log(baseUrl);

  // if (authUser) {
  //   req.headers.authorization = `Bearer ${authUser?.accessToken}`;
  // }

  return req;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<{ statusCode?: string; message?: string }>) => {
    const { response } = error;

    const ignoredStatusCodes = ["WrongUsernameOrPassword"];

    if (
      [401].includes(response?.status ?? 0) &&
      !ignoredStatusCodes.includes(response?.data?.statusCode ?? "")
    ) {
      // store.dispatch(tabActions.clearSession({}));
    }

    return Promise.reject(error);
  },
);
