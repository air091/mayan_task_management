import React from "react";

const Home = () => {
  return (
    <div className="border">
      <div className="border mx-auto w-full max-w-[720px]">
        <header>
          <h1 className="flex items-center gap-x-2">
            Mayan
            <span className="separator border-l border h-5"></span>
            Task management
          </h1>
          <div className="flex justify-center">
            <input
              type="search"
              placeholder="Search name"
              className="border w-full max-w-[360px] py-2 px-4"
            />
          </div>
        </header>

        <main>
          <table className="border w-full">
            <thead>
              <tr>
                <th className="text-start px-2 py-1 text-[14px] font-medium text-stone-600">
                  Title
                </th>
                <th className="text-start px-2 py-1 text-[14px] font-medium text-stone-600 w-[180px] border">
                  Started at
                </th>
                <th className="text-start px-2 py-1 text-[14px] font-medium text-stone-600 w-[180px] border">
                  Ended at
                </th>
                <th className="text-start px-2 py-1 text-[14px] font-medium text-stone-600 w-[90px] border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Home;
