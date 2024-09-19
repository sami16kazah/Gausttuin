import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const UserApi = createApi({
  reducerPath: 'user', // Adjust reducer path as needed
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL  }), // Replace with your Strapi API URL
  endpoints(builder){
    return {
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<{ jwt: string }, { username: string; email: string; password: string ,phone:number }>({
      query: (user) => ({
        url: 'auth/local/register',
        method: 'POST',
        body: user,
      }),
    })
  }
}
});


export const { useLoginMutation , useRegisterUserMutation }= UserApi;