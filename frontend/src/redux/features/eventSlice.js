import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  summary: "Tod do",
  events: [
    {
      id: "1",
      summary: "To do",
      events: [
        {
          id: "764378974389",
          summary: "summary",
          description: "description",
        },
      ],
    },
    {
      id: "2",
      summary: "In Progress",
      events: [
        {
          id: "298734789387",
          summary: "summary",
          description: "description",
        },
      ],
    },
    {
      id: "3",
      summary: "Completed",
      events: [
        {
          id: "3887438973498",
          summary: "summary",
          description: "description",
        },
      ],
    },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    changeEventColumn: (state) => {
      //change column via api here
      return state;
    },
  },
});

export const { changeEventColumn } = eventSlice.actions;

export default eventSlice.reducer;
