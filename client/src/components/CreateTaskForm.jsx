import React, { useState } from "react";
import Modal from "./Modal";

const CreateTaskForm = ({ isModalOpen, setIsModalOpen }) => {
  const [taskPayload, setTaskPayload] = useState({ name: "", description: "" });

  const createTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskPayload.name,
          description: taskPayload.description,
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data?.message);
    } catch (error) {
      console.error("Create task failed", error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTaskPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    await createTask();
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Create New Task"
    >
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-2 mt-4">
        <label>
          <span>Title</span>
          <input
            type="text"
            name="name"
            value={taskPayload.name}
            onChange={handleOnChange}
            placeholder="Ex. Task 1"
            className="border border-gray-300 block w-full rounded-sm py-1 px-2 mt-1"
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            rows={3}
            name="description"
            value={taskPayload.description}
            onChange={handleOnChange}
            placeholder="Ex. This is a task description"
            className="border border-gray-300 block w-full rounded-sm py-1 px-2 mt-1"
          />
        </label>

        <div className="flex items-center gap-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full bg-gray-300 rounded-md font-medium py-1 cursor-pointer hover:bg-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-green-400 rounded-md font-medium py-1 text-white cursor-pointer hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskForm;
