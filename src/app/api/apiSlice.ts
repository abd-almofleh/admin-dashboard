import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, logOut } from "../../features/auth/authSlice";
import { errorCodes, endPoints } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * If the result of the baseQuery is a loginFailed error, then refresh the token and try again.
 * @param {string | FetchArgs} args - string | FetchArgs
 * @param {BaseQueryApi} api - BaseQueryApi
 * @param {object} extraOptions - {
 *
 * @todo review the refresh process
 *
 * @returns The result of the baseQueryWithReauth function is the result of the baseQuery function.
 */
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === errorCodes.loginFailed) {
    const refreshResult = await baseQuery(endPoints.refreshToken, api, extraOptions);
    if (refreshResult?.data) {
      const state = api.getState() as any;
      const user = state.auth.user;
      api.dispatch(login({ ...(refreshResult.data as any), user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut(null));
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
