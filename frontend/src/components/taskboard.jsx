import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

const columns = ["todo", "in-progress", "done"];

export default function TaskBoard({ tasks, onUpdate, openEdit, onDelete }) {
  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const handleDrag = (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    onUpdate(taskId, { status: newStatus });
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <StrictModeDroppable droppableId={col} key={col}>
            {(provided) => (
              <div
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-lg font-semibold capitalize mb-4">
                  {col.replace("-", " ")}
                </h3>

                <div className="space-y-3">
                  {tasksByStatus[col].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onClick={() => openEdit(task)}
                            onDelete={() => onDelete(task._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </StrictModeDroppable>
        ))}
      </div>
    </DragDropContext>
  );
}

function TaskCard({ task, onClick, onDelete }) {
  const dateString = task.dueDate
    ? new Date(task.dueDate).toLocaleString()
    : "No due date";

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div
      className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition shadow-sm cursor-pointer relative"
      onClick={onClick}
    >
      {/* DELETE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent opening edit modal
          onDelete();
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
      >
        ✕
      </button>

      <div className="flex justify-between items-center mb-2 pr-6">
        <h4 className="font-semibold">{task.title}</h4>
        <span
          className={`text-xs px-2 py-1 rounded-lg ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500">{dateString}</p>
    </div>
  );
}