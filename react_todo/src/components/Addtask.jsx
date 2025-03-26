import React from "react";

function AddTask({ task, setTask, description, setDescription, addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;
