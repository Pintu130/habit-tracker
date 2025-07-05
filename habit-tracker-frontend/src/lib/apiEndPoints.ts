import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
  title: string;
  category: string;
  date: string;
  isRecurring: boolean;
  reminderTime: string;
}

export const apiEndPoints = createApi({
  reducerPath: "apiEndPoints",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
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

    addTask: builder.mutation({
      query: ({ token, data }: { token: string; data: Task }) => ({
        url: "tasks/add",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getAllTask: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: "tasks/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAddTaskMutation,
  useGetAllTaskMutation,
} = apiEndPoints;
