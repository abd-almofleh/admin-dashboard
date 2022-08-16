import { apiSlice } from "../../app/api/apiSlice";
import { GenericResponse } from "../../app/types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<GenericResponse, object>({
      query: (credential) => ({
        url: "v1/auth/login",
        method: "POST",
        body: credential,
      }),
    }),
    logout: builder.mutation<GenericResponse, void>({
      query: () => ({
        url: "v1/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
