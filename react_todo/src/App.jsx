import { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./components/Addtask";
import ListTask from "./components/listtask";
import "./App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);  // Track if a task is being edited

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://127.0.0.1:8000/api/task/")
      .then((response) => {
        setTasks(response.data.map((t) => ({
          id: t.id,
          text: t.title,
          description: t.description || "No description",
          completed: t.completed
        })));
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const addTask = () => {
    if (task.trim() && description.trim()) {
      const newTask = { title: task, description, completed: false };

      if (editingId) {
        // Update existing task
        axios.put(`http://127.0.0.1:8000/api/task/${editingId}/`, newTask)
          .then((response) => {
            setTasks(tasks.map((t) => (t.id === editingId ? { ...response.data, text: response.data.title } : t)));
            resetTaskFields();
          })
          .catch((error) => console.error("Error updating task:", error));
      } else {
        // Add new task
        axios.post("http://127.0.0.1:8000/api/task/", newTask)
          .then((response) => {
            setTasks([...tasks, { ...response.data, text: response.data.title }]);
            resetTaskFields();
          })
          .catch((error) => console.error("Error adding task:", error));
      }
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/task/${id}/`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.text);
      setDescription(taskToEdit.description);
      setEditingId(id);  // Store the task ID for updating
    }
  };

  const resetTaskFields = () => {
    setTask("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <AddTask
        task={task}
        setTask={setTask}
        description={description}
        setDescription={setDescription}
        addTask={addTask}
        isEditing={editingId !== null}  // Indicate edit mode
      />
      <ListTask
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}
