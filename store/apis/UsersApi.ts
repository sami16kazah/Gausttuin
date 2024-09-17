import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const UserApi = createApi({
  reducerPath: 'user', // Adjust reducer path as needed
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }), // Replace with your Strapi API URL
  endpoints(builder){
    return {
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/local',
        method: 'POST',
        body: credentials,
      }),
    })
  }
}
});


export const { useLoginMutation }= UserApi;