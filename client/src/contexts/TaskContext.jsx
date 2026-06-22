import { createContext, useCallback, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const createTask = async (title, description) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data?.message);
      await getAllTasks();
    } catch (error) {
      console.error("Create task failed", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!data.success) throw new Error(data?.message);
      await getAllTasks();
    } catch (error) {
      console.error("Delete task failed", error);
    }
  };

  const getAllTasks = useCallback(async () => {
    const params = {};
    if (search.trim() !== "") params.name = search;
    if (filter !== "all" && filter !== "") params.status = filter;

    const queryString = new URLSearchParams(params).toString();

    const baseURL = "http://localhost:3000/api/tasks";
    const url = queryString ? `${baseURL}?${queryString}` : baseURL;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      if (!data.success) throw new Error(data?.message);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Get all tasks failed", error);
    }
  }, [search, filter]);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        setTasks,
        search,
        setSearch,
        filter,
        setFilter,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
