import React from "react";

type Props = {
  boards: any[];
};

const DashboardMain = ({ boards }: Props) => {
  if (boards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">
          No boards yet
        </h1>
        <p className="text-gray-500 mb-6">
          Create your first board to get started
        </p>
        <button
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => console.log("open create board modal")}
        >
          + Create Board
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Boards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board._id}
            className="p-4 rounded-xl border hover:shadow cursor-pointer"
          >
            <h2 className="font-medium">{board.title}</h2>
            <p className="text-sm text-gray-500">
              {board.description || "No description"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMain;
