import { Plus, Search, X } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";

const Header = () => {
  const { search, setSearch, filter, setFilter } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full bg-white pb-2 select-none">
      {/* 1. Header Brand Title System */}
      <h1 className="flex items-center justify-center gap-x-3 px-4 font-bold text-xl md:text-2xl text-stone-900 tracking-tight my-4">
        <span>Mayan</span>
        {/* Simplified separator with accurate styling metrics */}
        <div className="h-5 w-px bg-stone-200" aria-hidden="true" />
        <span className="text-stone-500 font-medium text-lg md:text-xl">
          Task Management
        </span>
      </h1>

      {/* 2. Controls Sandbox Container */}
      <div className="flex flex-col gap-y-3 w-full max-w-[360px] mx-auto p-3 bg-white">
        {/* Search Input Box */}
        <div className="relative flex items-center w-full group">
          <span className="absolute left-3 text-stone-400 group-focus-within:text-stone-600 transition-colors pointer-events-none">
            <Search size={16} />
          </span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full py-2 pl-9 pr-9 text-sm text-stone-900 bg-stone-50 hover:bg-stone-100/70 focus:bg-white rounded-xl border border-stone-200/80 focus:border-stone-400 focus:ring-4 focus:ring-stone-100 outline-none transition-all duration-200 placeholder-stone-400"
          />

          {search.length > 0 && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 p-0.5 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 cursor-pointer transition-all"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Actions & Segmented Navigation Controls */}
        <div className="w-full flex items-center justify-between gap-x-1.5 border-t border-stone-100 pt-2">
          {/* New Task Button — Added whitespace-nowrap and shrink-0 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-1.5 px-2.5 flex items-center gap-x-1 bg-stone-900 hover:bg-stone-800 active:scale-95 cursor-pointer rounded-xl text-white text-xs font-medium shadow-sm transition-all duration-150 whitespace-nowrap shrink-0"
          >
            <Plus size={14} /> New Task
          </button>

          {/* Filter Navigation Links — Tuned padding down from px-2.5 to px-1.5 for breathing room */}
          <div className="flex gap-x-0.5 bg-stone-100/80 p-0.5 rounded-xl overflow-x-auto min-w-0">
            {["all", "inactive", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-1.5 py-1 text-[11px] font-medium capitalize rounded-lg cursor-pointer transition-all duration-200 select-none whitespace-nowrap
          ${
            filter === type
              ? "bg-white text-stone-950 shadow-xs animate-in fade-in zoom-in-95 duration-100"
              : "text-stone-500 hover:text-stone-800"
          }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Self-Contained Modal Mount Point */}
      <CreateTaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </header>
  );
};

export default Header;
