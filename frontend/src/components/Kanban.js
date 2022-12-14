import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Kanban.css";

export default function Kanban({
  changeEventColumn,
  Events,
  eventColumns,
  setEventColumns,
  onDragEnd,
}) {
  return (
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
  );
}
