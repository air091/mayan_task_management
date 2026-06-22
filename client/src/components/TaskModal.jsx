import React from "react";
import Modal from "./Modal";
import { useTasks } from "../hooks/useTasks";

const TaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const { selectedTask, setSelectedTask } = useTasks();

  if (!selectedTask) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={selectedTask.title}
    >
      <div>hi</div>
    </Modal>
  );
};

export default TaskModal;
