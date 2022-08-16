import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { selectCurrentToken } from "../../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }: { getState: Function }) => {
    const state = getState() as RootState;
    const token = selectCurrentToken(state);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
