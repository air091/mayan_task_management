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
    <main className="px-2 h-full overflow-y-auto overflow-x-hidden base-scrollbar relative">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="cursor-default">
            {/* Raised header sizing to 14px text-sm and extra top-bottom padding track */}
            <th className="sticky top-0 bg-white z-10 text-left px-4 py-3 text-sm font-bold text-stone-600 tracking-tight border-b border-stone-200">
              Title
            </th>
            <th className="sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[180px] border-b border-stone-200">
              Started at
            </th>
            <th className="sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[180px] border-b border-stone-200">
              Ended at
            </th>
            <th className="sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[140px] border-b border-stone-200">
              Status
            </th>
            <th className="sticky top-0 bg-white z-10 text-center px-2 py-3 text-sm font-bold text-stone-600 tracking-tight w-[140px] border-b border-stone-200">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-100/60">
          {tasks.length !== 0 ? (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="group odd:bg-white even:bg-stone-50/60 hover:bg-stone-100/80 cursor-pointer transition-colors duration-150"
              >
                <td className="py-3.5 px-4 rounded-l-xl">
                  <span className="font-semibold text-stone-900 block truncate w-full max-w-[292px] text-base group-hover:text-black">
                    {task.title}
                  </span>
                  <span className="text-xs block truncate w-[220px] text-stone-400 mt-1 group-hover:text-stone-500 transition-colors">
                    {task.description || "No description provided"}
                  </span>
                </td>

                <td className="py-3.5 px-2">
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

                <td className="py-3.5 px-2">
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

                <td className="py-3.5 px-2">
                  <div className="flex justify-center">
                    {task.startedAt !== null && task.endedAt ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold text-xs px-3 py-1 rounded-md">
                        Completed
                      </span>
                    ) : task.startedAt !== null ? (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200/60 font-semibold text-xs px-3 py-1 rounded-md">
                        Active
                      </span>
                    ) : (
                      <span className="bg-stone-100 text-stone-600 border border-stone-200 font-semibold text-xs px-3 py-1 rounded-md">
                        Inactive
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-2 rounded-r-xl">
                  <div className="flex items-center justify-center gap-x-2">
                    {task.startedAt !== null &&
                    task.endedAt ? null : task.startedAt !== null ? (
                      <button className="cursor-pointer bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all shadow-sm">
                        End
                      </button>
                    ) : (
                      <button className="cursor-pointer bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all shadow-sm">
                        Start
                      </button>
                    )}
                    <button className="text-stone-400 p-1.5 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all">
                      <Trash size={16} /> {/* Increased from 14 */}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
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
    </main>
  );
};

export default MainContent;
