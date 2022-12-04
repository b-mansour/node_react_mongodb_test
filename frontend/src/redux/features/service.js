// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
var access_token = localStorage.getItem("access_token");

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  endpoints: (builder) => ({
    // getTodosById: builder.query({
    //   query: (id) => `todos/${id}`,
    // }),
    getEvents: builder.query({
      query: () => ({
        url: "events/all-user-events",
        headers: { access_token: access_token },
        method: "GET",
      }),
    }),

    updateEvent: builder.mutation({
      query: (todo, access_token) => ({
        url: `/todo/${todo.id}`,
        headers: { access_token: access_token },
        method: "PATCH",
        body: todo,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventsQuery, useUpdateEventMutation } = eventsApi;
