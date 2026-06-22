import React, { useState } from "react";
import Modal from "./Modal";
import { useTasks } from "../hooks/useTasks";

const CreateTaskForm = ({ isModalOpen, setIsModalOpen }) => {
  const { createTask } = useTasks();
  const [taskPayload, setTaskPayload] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTaskPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    await createTask(taskPayload.title, taskPayload.description);
    setTaskPayload({ title: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Create New Task"
    >
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-y-4 mt-4 w-full"
      >
        <div className="flex flex-col gap-y-1.5 w-full">
          <label
            htmlFor="task-title"
            className="text-xs font-semibold text-stone-600 select-none"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            name="title"
            value={taskPayload.title}
            onChange={handleOnChange}
            placeholder="Ex. Finish landing page layout"
            autoComplete="off"
            required
            className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 hover:border-stone-300 focus:bg-white focus:border-stone-500 focus:ring-4 focus:ring-stone-100"
          />
        </div>

        <div className="flex flex-col gap-y-1.5 w-full">
          <label
            htmlFor="task-description"
            className="text-xs font-semibold text-stone-600 select-none"
          >
            Description
          </label>
          <textarea
            id="task-description"
            rows={3}
            name="description"
            value={taskPayload.description}
            onChange={handleOnChange}
            placeholder="Ex. Task description"
            className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all duration-200 hover:border-stone-300 focus:bg-white focus:border-stone-500 focus:ring-4 focus:ring-stone-100 resize-none"
          />
        </div>

        {/* 3. Action Buttons Group — Perfectly Responsive Footer Rows */}
        <div className="flex items-center gap-x-3 pt-2 mt-2 border-t border-stone-100 w-full">
          <button
            type="button" /* 💡 CRITICAL: Explicit type prevents form submission trigger */
            onClick={() => setIsModalOpen(false)}
            className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 active:scale-98 font-semibold text-sm rounded-xl cursor-pointer transition-all duration-150 text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white active:scale-98 font-semibold text-sm rounded-xl cursor-pointer transition-all duration-150 text-center shadow-xs"
          >
            Save Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskForm;
