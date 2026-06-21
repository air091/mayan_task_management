import React, { useEffect, useState } from "react";
import { EllipsisVertical, PenLine, Plus, Trash } from "lucide-react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useTasks } from "../hooks/useTasks";
import Modal from "../components/Modal";
import CreateTaskContent from "../components/CreateTaskForm";
import CreateTaskForm from "../components/CreateTaskForm";

const Home = () => {
  return (
    <div className="h-screen py-4">
      <div className="relative mx-auto flex flex-col w-full max-w-[1020px] py-3 px-1 h-full overflow-y-hidden">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
