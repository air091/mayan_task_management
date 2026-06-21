const Header = ({ search, setSearch }) => {
  return (
    <header>
      <h1 className="flex items-center justify-center gap-x-2 px-4 font-bold text-2xl mb-2">
        Mayan
        <span className="separator border-l border h-5"></span>
        Task management
      </h1>
      <div className="flex justify-center py-2">
        <input
          type="search"
          placeholder="Search name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border w-full max-w-[360px] py-1 px-4 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
