import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/', // Replace with your actual backend URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser: { name: string; email: string; password: string }) => ({
        url: 'auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    getUsers: builder.query({
      query: () => 'auth/users', // Adjust if your endpoint is different
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUsersQuery } = authApi;
