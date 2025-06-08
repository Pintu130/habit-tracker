import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser: { name: string; email: string; password: string }) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload: { email: string }) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }: { token: string; password: string }) => ({
        url: `auth/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),

    getUsers: builder.query({
      query: () => "auth/users",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
