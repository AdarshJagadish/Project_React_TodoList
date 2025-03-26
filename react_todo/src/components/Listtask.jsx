import React from "react";

function ListTask({ tasks, deleteTask, editTask }) {
  return (
    <div className="task-list">
      <h1>Task List</h1>
      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
          <div className="task-content">
            <span className="task-title">{task.text}</span>
            <p className="task-desc">{task.description}</p>
          </div>
          <div className="task-actions">
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={()  => window.confirm("Are you sure you want to delete this task?") && deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListTask;
