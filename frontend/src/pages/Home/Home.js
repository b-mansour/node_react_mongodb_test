import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useGetEventsQuery } from "../../redux/features/service";
import "./Home.css";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const eventsdata = [
  {
    id: "1",
    title: "To do",
    items: [
      {
        id: "764378974389",
        title: "title",
        content: "content",
      },

      {
        id: "764378974382",
        title: "title",
        content: "content",
      },

      {
        id: "7643789743866",
        title: "title",
        content: "content",
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    items: [
      {
        id: "298734789387",
        title: "title",
        content: "content",
      },

      {
        id: "298634789387",
        title: "title",
        content: "content",
      },

      {
        id: "298724789387",
        title: "title",
        content: "content",
      },
    ],
  },
  {
    id: "3",
    title: "Completed",
    items: [
      {
        id: "3887438973498",
        title: "title",
        content: "content",
      },

      {
        id: "38874383498",
        title: "title",
        content: "content",
      },

      {
        id: "38874373498",
        title: "title",
        content: "content",
      },
    ],
  },
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) {
    return;
  }

  console.log(result);

  // else {
  //   const { source, destination } = result;
  //   // console.log("source is " + source);
  //   // console.log("destination is" + destination);

  //   const column = columns[source.droppableId];
  //   const itemscopy = [...column.items];
  //   const [removed] = itemscopy.splice(source.index, 1);
  //   itemscopy.splice(destination.index, 0, removed);
  //   setColumns({
  //     ...columns,
  //     [source.droppableId]: {
  //       ...column,
  //       items: itemscopy,
  //     },
  //   });
  // }
};

export default function Home() {
  const {
    data: Events,
    error: EventsError,
    isLoading: EventsLoading,
  } = useGetEventsQuery();
  // const { data, error, isLoading } = useGetTodosByIdQuery("1");
  const [columns, setColumns] = useState(eventsdata);

  useEffect(() => {
    // console.log(localStorage.getItem("access_token"));
  });

  // const { todos, err, isLoadingg } = useGetEventsQuery();

  return (
    <div className="container">
      {EventsError ? (
        <>Oh no, there was an error</>
      ) : EventsLoading ? (
        <>Loading...</>
      ) : Events ? (
        <>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Events.map((column) => {
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
                                        : "blue",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.summary}
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
