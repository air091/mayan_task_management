import React, { useEffect, useState } from "react";
import { EllipsisVertical, PenLine, Trash } from "lucide-react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
      });
      const data = await response.json();
      if (!data.success) throw new Error(data?.message);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Get all tasks failed", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const formatDate = (date) => {
    const rawDate = new Date(date);
    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, "0");
    const day = String(rawDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="border h-screen">
      <div className="mx-auto w-full max-w-[1020px] py-3 mt-4">
        <header>
          <h1 className="flex items-center gap-x-2 px-4">
            Mayan
            <span className="separator border-l border h-5"></span>
            Task management
          </h1>
          <div className="flex justify-center py-2">
            <input
              type="search"
              placeholder="Search name"
              className="border w-full max-w-[360px] py-2 px-4"
            />
          </div>
        </header>

        <main className="px-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-start px-2 py-1 text-[14px] font-regular text-stone-600">
                  Title
                </th>
                <th className="text-center px-2 py-1 text-[14px] font-regular text-stone-600 w-[180px]">
                  Started at
                </th>
                <th className="text-center px-2 py-1 text-[14px] font-regular text-stone-600 w-[180px]">
                  Ended at
                </th>
                <th className="text-center px-2 py-1 text-[14px] font-regular text-stone-600 w-[140px]">
                  Status
                </th>
                <th className="text-center px-2 py-1 text-[14px] font-regular text-stone-600 w-[140px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="bg-gray-50 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-1 px-2 rounded-l">
                    <span className="font-medium">{task.title}</span>
                    <span className="text-[10px] block truncate w-[192px]">
                      {task.description}
                    </span>
                  </td>
                  <td className="py-1 px-2">
                    <div className="flex justify-center">
                      <span className=" px-3 py-1 text-[12px] rounded-full font-medium bg-green-600 text-white">
                        {formatDate(task.startedAt)}
                      </span>
                    </div>
                  </td>
                  <td className="py-1 px-2">
                    <div className="flex justify-center">
                      <span className=" px-3 py-1 text-[12px] rounded-full font-medium bg-red-600 text-white">
                        {formatDate(task.endedAt)}
                      </span>
                    </div>
                  </td>
                  <td className="py-1 px-2">
                    <div className="flex justify-center ">
                      {task.startedAt !== null && task.endedAt ? (
                        <span className="bg-green-600 text-white font-medium text-[12px] px-3 py-1 rounded-full">
                          Completed
                        </span>
                      ) : task.startedAt !== null ? (
                        <span className="bg-yellow-500 text-white font-medium text-[12px] px-3 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white font-medium text-[12px] px-3 py-1 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-2 rounded-r">
                    <div className="flex items-center justify-center gap-x-2">
                      {task.startedAt !== null &&
                      task.endedAt ? null : task.startedAt !== null ? (
                        <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-[12px] px-3 py-1 rounded-full">
                          End
                        </button>
                      ) : (
                        <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium text-[12px] px-3 py-1 rounded-full">
                          Start
                        </button>
                      )}
                      <button className="text-[12px] p-1 rounded-full cursor-pointer bg-red-600 hover:bg-red-700 text-white">
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Home;
