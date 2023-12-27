"use client";

import axios from "@/lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post(
      "/auth/refresh",
      null,
      {
        headers: {
          RefreshToken: session?.RefreshToken,
          Authorization: session?.IdToken,
        },
      }
    );
    

    if (session) {
      session.AcessToken = res.data.AccessToken;
      session.IdToken = res.data.IdToken;
    } else signIn();
  };

  return refreshToken;
};
