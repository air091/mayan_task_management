import { Search, X } from "lucide-react";

const Header = ({ search, setSearch, filter, setFilter }) => {
  return (
    <header>
      <h1 className="flex items-center justify-center gap-x-2 px-4 font-bold text-2xl mb-2">
        Mayan
        <span className="separator border-l border h-5"></span>
        Task management
      </h1>
      <div className="flex justify-center py-2">
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
            <X size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
