import { apiSlice } from "../../app/api/apiSlice";
import { GenericResponse, IUser } from "../../app/types";

interface LoginResponse extends GenericResponse {
  data: {
    user: IUser;
  };
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, { email: string; password: string }>({
      query: (credential) => ({
        url: "v1/auth/login",
        method: "POST",
        body: credential,
      }),
      transformResponse: (response: LoginResponse) => {
        return response.data.user;
      },
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
