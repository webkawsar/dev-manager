import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const isProduction = import.meta.env.PROD;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: isProduction
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
