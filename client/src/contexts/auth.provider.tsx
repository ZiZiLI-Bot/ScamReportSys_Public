"use client";
import { TUser } from "@/lib/Types";
import { CL_Http } from "@/utils/Http/Http.client";
import { TRes } from "@/utils/Http/Http.types";
import { getCookie } from "cookies-next";
import React, { useLayoutEffect, useReducer } from "react";
import { AuthContext, TAuthUser, initialState } from "./auth.context";
import { authReducer, initialize } from "./auth.reducer";

type TResAuth = {
  _id: string;
  email: string;
  role: string;
  user: TUser;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const ReLogin = async () => {
    const token = getCookie("token");
    if (token) {
      const { data: res } = await CL_Http.get<TRes<TResAuth>>("/auth/me");
      const user: TAuthUser = {
        _id: res.data?._id,
        email: res.data?.email,
        role: res.data?.role,
        name: res.data?.user.firstName + " " + res.data?.user.lastName,
        user_id: res.data?.user._id,
      };
      dispatch(initialize({ isAuthenticated: true, user }));
    } else {
      dispatch(initialize({ isAuthenticated: false, user: null }));
    }
  };

  useLayoutEffect(() => {
    ReLogin();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
}
