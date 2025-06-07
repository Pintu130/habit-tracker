import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const habitApi = createApi({
  reducerPath: 'habitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    // Add more endpoints like register, fetchHabits, etc.
  }),
});

export const { useLoginMutation } = habitApi;
