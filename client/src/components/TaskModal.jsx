import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useTasks } from "../hooks/useTasks";

const TaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const { selectedTask, setSelectedTask, editTask } = useTasks();
  const [task, setTask] = useState({
    title: selectedTask.title,
    description: selectedTask.description,
  });

  useEffect(() => {
    if (selectedTask) {
      setTask({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
      });
    }
  }, [selectedTask]);

  if (!selectedTask) return null;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    await editTask(selectedTask.id, task.title, task.description);
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const isFormDirty =
    selectedTask.title !== task.title ||
    (selectedTask.description || "") !== task.description;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setSelectedTask(null);
      }}
      title={"Task details"}
    >
      <div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-y-4 mt-4 w-full"
        >
          {/* 1. Title Field */}
          <div className="flex flex-col gap-y-1.5 w-full">
            <label
              htmlFor="title"
              className="text-xs font-semibold text-stone-600 select-none"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleOnChange}
              placeholder="Task title"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 hover:border-stone-300 focus:bg-white focus:border-stone-500 focus:ring-4 focus:ring-stone-100"
            />
          </div>

          {/* 2. Description Field */}
          <div className="flex flex-col gap-y-1.5 w-full">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-stone-600 select-none"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              name="description"
              value={task.description || ""}
              onChange={handleOnChange}
              placeholder="Add a detailed description..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 hover:border-stone-300 focus:bg-white focus:border-stone-500 focus:ring-4 focus:ring-stone-100 resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-x-3 border-stone-100 w-full">
            {!selectedTask.startedAt && (
              <button className="w-full sm:w-auto py-2.5 px-5 bg-stone-100 hover:bg-stone-200 text-stone-800 active:scale-98 font-semibold text-sm rounded-xl cursor-pointer transition-all duration-150 text-center">
                Start task
              </button>
            )}
            {selectedTask.startedAt && !selectedTask.endedAt && (
              <button className="w-full sm:w-auto py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white active:scale-98 font-semibold text-sm rounded-xl cursor-pointer transition-all duration-150 text-center shadow-xs">
                End task
              </button>
            )}
            {isFormDirty && (
              <button
                type="submit"
                className="w-full sm:w-auto py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white active:scale-98 font-semibold text-sm rounded-xl cursor-pointer transition-all duration-150 text-center shadow-xs"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
