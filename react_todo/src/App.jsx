import { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import "./App.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://127.0.0.1:8000/api/tasks/")
      .then((response) => {
        const sortedTasks = response.data
          .map((t) => ({
            id: t.id,
            text: t.title,
            description: t.description || "No description",
            completed: t.completed,
          }))
          .sort((a, b) => a.completed - b.completed); // Uncompleted first
  
        setTasks(sortedTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };
  

  const addTask = () => {
    const newTask = { title: task, description, completed: false };
    if (editingId) {
      axios.put(`http://127.0.0.1:8000/api/tasks/${editingId}/`, newTask)
        .then((response) => {
          setTasks(tasks.map((t) => t.id === editingId ? { ...response.data, text: response.data.title.toUpperCase() } : t));
          resetTaskFields();
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      axios.post("http://127.0.0.1:8000/api/tasks/", newTask)
        .then((response) => {
          setTasks([...tasks, { ...response.data, text: response.data.title.toUpperCase() }]);
          resetTaskFields();
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
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
      setEditingId(id);
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    axios.patch(`http://127.0.0.1:8000/api/tasks/${id}/`, { completed: !tasks.find(t => t.id === id).completed })
      .catch(error => console.error("Error updating task status:", error));
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
      />
      <ListTask
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}
