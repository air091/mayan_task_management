import { Search, X } from "lucide-react";
import { useTasks } from "../hooks/useTasks";

const Header = () => {
  const { search, setSearch } = useTasks();
  return (
    <header>
      <h1 className="flex items-center justify-center gap-x-2 px-4 font-bold text-2xl mb-2">
        Mayan
        <span className="separator border-l border h-8"></span>
        Task Management
      </h1>
      <div className="flex flex-col items-center justify-center py-2 border">
        <div className="relative w-full max-w-[360px]">
          <input
            type="search"
            placeholder="Search task"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="ring-1 w-full py-1 pl-8 pr-7 rounded-full [&::-webkit-search-cancel-button]:appearance-none outline-0"
          />
          <span className="absolute top-[6px] left-2">
            <Search size={20} />
          </span>
          <button
            onClick={() => setSearch("")}
            className="absolute top-[6px] right-2 cursor-pointer"
          >
            {search.length > 0 && <X size={20} />}
          </button>
          <div className="filters border flex items-center justify-end py-1">
            <button className="px-2 text-[14px] cursor-pointer hover:border-b-2 hover:border-gray-300">
              All
            </button>
            <button className="px-2 text-[14px] cursor-pointer hover:border-b-2 hover:border-gray-300">
              Inactive
            </button>
            <button className="px-2 text-[14px] cursor-pointer hover:border-b-2 hover:border-gray-300">
              Active
            </button>
            <button className="px-2 text-[14px] cursor-pointer hover:border-b-2 hover:border-gray-300">
              Completed
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
