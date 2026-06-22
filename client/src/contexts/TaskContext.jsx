import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const getAllTasks = async () => {
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
    };
    getAllTasks();
  }, [search, filter]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
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
