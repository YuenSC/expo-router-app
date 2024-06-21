import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import Config from "../Config";

axios.defaults.baseURL = Config.apiUrl;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // log url and method
    if (Config.env === "local")
      console.log("Request was sent to: ", config.url, config.method);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (Config.env === "local")
      console.log("Response was received from: ", response.config.url);
    return response;
  },
  async function (error) {
    if (axios.isAxiosError(error)) {
      if (Config.env === "local")
        console.log("Error request", error.response?.data);
      if (error.response?.status === 401) {
        await SecureStore.deleteItemAsync("access_token");
        router.navigate("/");
      }
    }
    return Promise.reject(error);
  },
);

export const setAxiosToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getToken = () => {
  return axios.defaults.headers.common["Authorization"];
};
