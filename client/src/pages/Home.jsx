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
    <div className="h-screen max-h-screen sm:py-4 bg-stone-50/50 overflow-hidden">
      {/* Container converts layout dynamically from flat mobile views to isolated desktop dashboards */}
      <div className="relative mx-auto grid grid-rows-[auto_1fr] w-full max-w-[1020px] h-full bg-white sm:rounded-2xl sm:border sm:border-stone-200/60 sm:shadow-xs overflow-hidden">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
