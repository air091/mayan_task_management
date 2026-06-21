import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllTasks = async () => {
      const url = `http://localhost:3000/api/tasks${search ? `?name=${search}` : ""}`;
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
  }, [search]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, search, setSearch }}>
      {children}
    </TaskContext.Provider>
  );
};
