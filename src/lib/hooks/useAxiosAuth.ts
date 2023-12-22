"use client";

import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: userSession } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `${userSession?.IdToken}`;

          config.headers[
            "AccessToken"
          ] = `${userSession?.AcessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          await refreshToken();

          prevRequest.headers["Authorization"] = `${userSession?.IdToken}`;
          prevRequest.headers["AccessToken"] = `${userSession?.AcessToken}`;

          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [userSession, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
