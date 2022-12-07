import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../redux/features/service";
import "./home.css";

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

  // const { source, destination, draggableId } = result;
  // const sourceColumn = eventColumns.forEach((column) => {
  //   if (column._id === source.droppableId) {
  //     console.log(column.events);
  //     console.log(draggableId);

  //     // column.events.filter((event) => event._id !== draggableId);
  //   }
  // });

  // console.log(sourceColumn);

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
      // console.log(eventColumns);
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
      // console.log(userinfo);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const [changeEventColumn] = useUpdateEventMutation();

  useEffect(() => {
    checkAccessToken();
    assignEventColumns();
  }, [Events, eventColumns]);

  return (
    <div className="container">
      {/* <h1 >kanban</h1> */}
      {EventsError ? (
        <>Oh no, there was an error</>
      ) : EventsLoading ? (
        <>Loading...</>
      ) : Events ? (
        <>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(
                result,
                changeEventColumn,
                Events,
                eventColumns,
                setEventColumns
              )
            }
          >
            {eventColumns?.map((column) => {
              return (
                <Droppable key={column._id} droppableId={column._id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="droppable"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#b4b8b7"
                            : "#737877",
                        }}
                      >
                        <h2 className="droppable-title">{column.title}</h2>

                        {column.events.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="draggable"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      background: snapshot.isDragging
                                        ? "yellow"
                                        : "#f2f2f2",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <h5> {item.summary}</h5>
                                    <p>{item.description}</p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </>
      ) : null}
    </div>
  );
}
