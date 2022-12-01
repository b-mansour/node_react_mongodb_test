import React, { useState } from "react";
import { DragDropContext, Dropappable, Draggable } from "react-beautiful-dnd";
import "./Home.css";

const data = [
  {
    id: "list-1",
    title: "To do",
    cards: [
      {
        id: "1",
        title: "vim practice",
      },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [],
  },
  {
    id: "list-3",
    title: "Completed",
    cards: [],
  },
];

const backendcolumns = ["list-1", "list-2", "list-3"];

export default function Home() {
  const [columns, setCoumns] = useState(backendcolumns);
  return (
    <div className="container">
      {columns.map((column) => {
        console.log(column);
        data.map((item) => {
          if (item.id === column) {
            console.log(item);
          }
        });
      })}
      {/* <DragDropContext
        onDropEnd={(result) => console.log(result)}
      ></DragDropContext> */}
    </div>
  );
}
