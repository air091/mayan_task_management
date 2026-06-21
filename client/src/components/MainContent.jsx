import { Trash } from "lucide-react";
import React from "react";
import { useTasks } from "../hooks/useTasks";

const MainContent = () => {
  const { tasks } = useTasks();

  const formatDate = (date) => {
    if (!date) return null;
    const rawDate = new Date(date);
    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, "0");
    const day = String(rawDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="px-2 h-full overflow-y-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="cursor-default">
            <th className="text-left px-4 py-1 text-[14px] font-regular text-stone-600">
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
              className="hover:bg-gray-300/80 even:bg-white odd:bg-stone-200/70 cursor-pointer"
            >
              <td className="py-1 px-4 rounded-l">
                <span className="font-medium block truncate w-full max-w-[292px]">
                  {task.title}
                </span>
                <span className="text-[10px] block truncate w-[192px] text-gray-500">
                  {task.description}
                </span>
              </td>
              <td className="py-1 px-2">
                {task.startedAt && (
                  <div className="flex justify-center">
                    <span className=" px-3 py-1 text-[12px] rounded-full font-medium bg-green-600 text-white">
                      {formatDate(task.startedAt)}
                    </span>
                  </div>
                )}
              </td>
              <td className="py-1 px-2">
                {task.endedAt && (
                  <div className="flex justify-center">
                    <span className=" px-3 py-1 text-[12px] rounded-full font-medium bg-red-600 text-white">
                      {formatDate(task.endedAt)}
                    </span>
                  </div>
                )}
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
  );
};

export default MainContent;
