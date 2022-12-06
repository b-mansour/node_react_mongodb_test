// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
var access_token = localStorage.getItem("access_token");

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "events/all-user-events",
        headers: { access_token: access_token },
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    updateEvent: builder.mutation({
      query: (data, access_token) => ({
        url: "/events/change-event-column",
        headers: { access_token: access_token },
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventsQuery, useUpdateEventMutation } = eventsApi;
