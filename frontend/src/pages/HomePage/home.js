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

  console.log(result);
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

  const [changeEventColumn] = useUpdateEventMutation();

  useEffect(() => {
    checkAccessToken();
    assignEventColumns();
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
