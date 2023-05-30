import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (data) => ({
          url: `/auth/local/register`,
          method: "POST",
          body: data,
        }),
      }),
      login: builder.mutation({
        query: (data) => ({
          url: `/auth/local`,
          method: "POST",
          body: data,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            const { jwt, user } = result.data;

            // update redux state
            dispatch(
              userLoggedIn({
                token: jwt,
                user,
              })
            );

            // set data to local storage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(jwt));
            
          } catch (error) {
            // do nothing
          }
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
