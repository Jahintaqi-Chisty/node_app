// import { axiosPrivate } from '../api/axios';
import { useEffect } from "react";
// import useRefreshToken from './useRefreshToken';
import Axios from "axios";
import { useAuth } from "./useAuth";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const axios = Axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPrivate = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${!!user ? user.token : ""}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responseIntercept = axios.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     try {
    //       const prevRequest = error?.config;
    //       console.log(prevRequest.sent);
    //       if (error?.response?.status === 401 && !prevRequest?.sent) {
    //         // if (error && !prevRequest?.sent) {
    //         prevRequest.sent = true;
    //         const localRefresh = localStorage.getItem("refresh") || false;
    //         const response = await axios.post("/auth/jwt/refresh/", {
    //           refresh: localRefresh,
    //         });
    //         setAuth((prev) => ({
    //           ...prev,
    //           refresh: localRefresh,
    //           access: response.data.access,
    //         }));

    //         const newAccessToken = response.data.access;
    //         prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //         return axios(prevRequest);
    //       }
    //       return Promise.reject(error);
    //     } catch (err) {
    //       console.log(err);
    //       return err;
    //     }
    //   }
    // );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      // axios.interceptors.response.eject(responseIntercept);
    };
  }, [user]);

  return axios;
};

export default useAxiosPrivate;
