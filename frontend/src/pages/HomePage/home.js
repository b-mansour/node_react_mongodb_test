import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Kanban from "../../components/Kanban";

import {
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../redux/features/service";

const onDragEnd = (
  result,
  changeEventColumn,
  Events,
  eventColumns,
  setEventColumns
) => {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;
  var copyEventColumns = structuredClone(eventColumns);
  let removed;

  copyEventColumns.forEach((column, index) => {
    if (column._id === source.droppableId) {
      [removed] = copyEventColumns[index].events.splice(source.index, 1);
      console.log(removed);
    }
  });

  copyEventColumns.forEach((column, index) => {
    if (column._id === destination.droppableId) {
      console.log(removed);
      if (removed) {
        copyEventColumns[index].events.splice(destination.index, 0, removed);
      }
    }
    setEventColumns(copyEventColumns);
  });

  changeEventColumn(result);
  // console.log(result);
};

export default function Home() {
  const navigate = useNavigate();
  const [eventColumns, setEventColumns] = useState();
  const {
    data: Events,
    error: EventsError,
    isLoading: EventsLoading,
  } = useGetEventsQuery();

  const assignEventColumns = () => {
    if (Events) {
      setEventColumns(Events);
    }
  };

  const checkAccessToken = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GET_USER_DATA_URL +
          localStorage.getItem("access_token"),
        {
          headers: {
            "Content-Type": "application/json",
            // "Accept-Encoding": "application/json",
          },
        }
      );
      const userinfo = response.data;
      console.log(userinfo);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const getEvents = async () => {
    try {
      var response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Accept: "application/json",
          },
        }
      );
      addEvents(response.data.items);
      console.log(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const addEvents = async (events) => {
    const headers = {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    };

    try {
      var response = await axios.post(
        "http://localhost:4000/events/add-events",
        events,
        {
          headers: headers,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [changeEventColumn] = useUpdateEventMutation();

  useEffect(() => {
    checkAccessToken();
    assignEventColumns();
    getEvents();
  }, [Events]);

  return (
    <div className="container">
      {EventsError ? (
        <>Oh no, there was an error</>
      ) : EventsLoading && !eventColumns ? (
        <>Loading...</>
      ) : Events && eventColumns ? (
        <Kanban
          changeEventColumn={changeEventColumn}
          Events={Events}
          eventColumns={eventColumns}
          setEventColumns={setEventColumns}
          onDragEnd={onDragEnd}
        />
      ) : null}
    </div>
  );
}
