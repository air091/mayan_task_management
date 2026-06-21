import React, { useEffect, useState } from "react";
import { EllipsisVertical, PenLine, Plus, Trash } from "lucide-react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useTasks } from "../hooks/useTasks";
import Modal from "../components/Modal";
import CreateTaskContent from "../components/CreateTaskForm";
import CreateTaskForm from "../components/CreateTaskForm";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen py-4">
      <div className="relative mx-auto flex flex-col w-full max-w-[1020px] py-3 px-1 h-full overflow-y-hidden">
        <Header />
        <MainContent />
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-2 right-2 block bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-full p-2"
        >
          <Plus size={32} />
        </button>
      </div>

      <CreateTaskForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Home;
