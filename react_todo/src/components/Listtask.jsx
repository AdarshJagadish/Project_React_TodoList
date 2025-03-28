import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

function ListTask({ tasks, deleteTask, editTask, toggleComplete }) {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new one!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div className="task-content">
              <span className="task-title">{task.text}</span>
              <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions">
              <FaEdit className="edit-icon" onClick={() => editTask(task.id)} />
              <FaTrash className="delete-icon" onClick={() => deleteTask(task.id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListTask;
