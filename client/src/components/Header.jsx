import { Plus, Search, X } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";

const Header = () => {
  const { search, setSearch, filter, setFilter } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full bg-white pb-2 select-none px-4 pt-2">
      {/* Brand Title System — Fluid text sizing (text-lg on mobile, text-2xl on desktop) */}
      <h1 className="flex items-center justify-center gap-x-2 sm:gap-x-3 font-bold text-lg sm:text-2xl text-stone-900 tracking-tight my-2 sm:my-4">
        <span>Mayan</span>
        <div className="h-4 sm:h-5 w-px bg-stone-200" aria-hidden="true" />
        <span className="text-stone-500 font-medium text-base sm:text-xl">
          Task Management
        </span>
      </h1>

      <div className="flex flex-col gap-y-1 w-full max-w-[420px] mx-auto p-1 sm:p-3 bg-white">
        <div className="relative flex items-center w-full group">
          <span className="absolute left-3.5 text-stone-400 group-focus-within:text-stone-600 transition-colors pointer-events-none">
            <Search size={18} />
          </span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full py-2.5 pl-11 pr-10 text-base text-stone-900 bg-stone-50 hover:bg-stone-100/70 focus:bg-white rounded-xl border border-stone-200/80 focus:border-stone-400 focus:ring-4 focus:ring-stone-100 outline-none transition-all duration-200 placeholder-stone-400"
          />

          {search.length > 0 && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 p-0.5 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 cursor-pointer transition-all"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="w-full flex items-center justify-between gap-x-2 border-stone-100 pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-3.5 flex items-center gap-x-1.5 bg-stone-900 hover:bg-stone-800 active:scale-95 cursor-pointer rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
          >
            <Plus size={16} /> New Task
          </button>

          <div className="flex gap-x-1 bg-stone-100/80 p-1 rounded-xl min-w-0 overflow-x-auto base-scrollbar">
            {["all", "inactive", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-lg cursor-pointer transition-all duration-200 select-none whitespace-nowrap
                  ${
                    filter === type
                      ? "bg-white text-stone-950 shadow-sm"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      <CreateTaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </header>
  );
};

export default Header;
