import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

import {
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../redux/features/service";
import "./Home.css";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const onDragEnd = (result, changeEventColumn) => {
  if (!result.destination) {
    return;
  }

  changeEventColumn(result);

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
  const navigate = useNavigate();

  const {
    data: Events,
    error: EventsError,
    isLoading: EventsLoading,
  } = useGetEventsQuery();

  const [changeEventColumn] = useUpdateEventMutation();
  // const { data, error, isLoading } = useGetTodosByIdQuery("1");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
    console.log(localStorage.getItem("access_token"));
  }, [Events]);

  return (
    <div className="container">
      {EventsError ? (
        <>Oh no, there was an error</>
      ) : EventsLoading ? (
        <>Loading...</>
      ) : Events ? (
        <>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, changeEventColumn)}
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
                                        : "blue",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.description}
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
