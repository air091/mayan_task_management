import React, { useEffect, useState } from "react";
import { EllipsisVertical, PenLine, Plus, Trash } from "lucide-react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

const Home = () => {
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
    <div className="border h-screen py-4">
      <div className="relative mx-auto w-full max-w-[1020px] py-3 px-1 border h-full">
        <Header search={search} setSearch={setSearch} />
        <MainContent tasks={tasks} />
        <button className="absolute bottom-2 right-2 block bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-full p-2">
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
};

export default Home;
