import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskModal from "./TaskModal";

const MainContent = () => {
  const { tasks, selectedTask, setSelectedTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    const rawDate = new Date(date);
    const year = rawDate.getFullYear();
    const month = String(rawDate.getMonth() + 1).padStart(2, "0");
    const day = String(rawDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="px-4 h-full overflow-y-auto overflow-x-auto base-scrollbar relative pb-6">
      <table className="w-full min-w-[340px] md:table-fixed border-collapse">
        <thead>
          <tr className="cursor-default">
            <th className="sticky top-0 bg-white mountaineer-header z-10 text-left py-3 pr-2 pl-4 text-sm font-bold text-stone-600 tracking-tight border-b border-stone-200">
              Title
            </th>
            {/* 💡 HIDDEN ON MOBILE: Revealed exclusively starting at 'md' tablets */}
            <th className="hidden md:table-cell sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[120px] border-b border-stone-200">
              Started at
            </th>
            <th className="hidden md:table-cell sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[120px] border-b border-stone-200">
              Ended at
            </th>
            <th className="sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[100px] sm:w-[100px] border-b border-stone-200">
              Status
            </th>
            <th className="sticky top-0 bg-white z-10 text-center pl-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[110px] sm:w-[140px] border-b border-stone-200">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-100/60">
          {tasks.length !== 0 ? (
            tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setIsModalOpen(true);
                }}
                className="group odd:bg-white even:bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors duration-150"
              >
                {/* title & description */}
                <td className="py-3.5 pr-2 pl-4 rounded-l-xl">
                  {/* Dynamic text max-width allocation handles long text truncation smoothly */}
                  <span className="font-semibold text-stone-900 block truncate w-full max-w-[160px] sm:max-w-[292px] text-sm sm:text-base group-hover:text-black">
                    {task.title}
                  </span>
                  <span className="text-xs block truncate w-full max-w-[140px] sm:max-w-[220px] text-stone-400 mt-1 group-hover:text-stone-500 transition-colors">
                    {task.description || "No description provided"}
                  </span>
                </td>

                {/* started at */}
                <td className="hidden md:table-cell py-3.5 px-2">
                  <div className="flex justify-center">
                    {task.startedAt ? (
                      <span className="px-3 py-1 text-xs rounded-md font-medium bg-stone-100 text-stone-700 border border-stone-200/50 whitespace-nowrap">
                        {formatDate(task.startedAt)}
                      </span>
                    ) : (
                      <span className="text-stone-300 text-sm font-medium">
                        —
                      </span>
                    )}
                  </div>
                </td>

                {/* ended at */}
                <td className="hidden md:table-cell py-3.5 px-2">
                  <div className="flex justify-center">
                    {task.endedAt ? (
                      <span className="px-3 py-1 text-xs rounded-md font-medium bg-stone-100 text-stone-700 border border-stone-200/50 whitespace-nowrap">
                        {formatDate(task.endedAt)}
                      </span>
                    ) : (
                      <span className="text-stone-300 text-sm font-medium">
                        —
                      </span>
                    )}
                  </div>
                </td>

                {/* status */}
                <td className="py-3.5 px-2">
                  <div className="flex justify-center">
                    {task.startedAt !== null && task.endedAt ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                        Done
                      </span>
                    ) : task.startedAt !== null ? (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200/60 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                        Active
                      </span>
                    ) : (
                      <span className="bg-stone-100 text-stone-600 border border-stone-200 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                        Open
                      </span>
                    )}
                  </div>
                </td>

                {/* actions */}
                <td className="py-3.5 pl-2 rounded-r-xl">
                  <div className="flex items-center justify-center gap-x-1 sm:gap-x-2">
                    {task.startedAt !== null &&
                    task.endedAt ? null : task.startedAt !== null ? (
                      <button className="cursor-pointer bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all shadow-sm">
                        End
                      </button>
                    ) : (
                      <button className="cursor-pointer bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-semibold text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all shadow-sm">
                        Start
                      </button>
                    )}
                    <button
                      onClick={async (event) => {
                        event.stopPropagation();
                        await deleteTask(task.id);
                      }}
                      className="text-stone-400 p-1 sm:p-1.5 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all shrink-0"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* not found */}
              <td colSpan={5} className="py-16 text-center">
                <p className="text-base font-semibold text-stone-500">
                  No tasks found
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  Try adjusting your active text search or status filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </main>
  );
};

export default MainContent;
