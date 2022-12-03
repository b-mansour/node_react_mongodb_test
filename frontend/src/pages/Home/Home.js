import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  useGetTodosByIdQuery,
  useGetTodosQuery,
} from "../../redux/features/service";
import "./Home.css";

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
  const { data, error, isLoading } = useGetTodosByIdQuery("1");

  const {
    data: allTodosData,
    error: allTodosError,
    isLoading: AllTodosLoading,
  } = useGetTodosQuery();

  // const { todos, err, isLoadingg } = useGetTodosQuery();

  const [columns, setColumns] = useState(eventsdata);
  return (
    <div className="container">
      {console.log(allTodosData)}
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.title}</h3>
        </>
      ) : null}

      {/* {columns.map((column) => {
        console.log(column.title);
        column.items.map((item) => {
          console.log(item.content);
        });
      })} */}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns.map((column) => {
          return (
            <Droppable key={column.id} droppableId={column.id}>
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
                    {column.items.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
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
                                {item.content}
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
    </div>
  );
}
