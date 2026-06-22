import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { useTasks } from "../hooks/useTasks";
import { formatDate } from "../utils/DateFormatter";

const Modal = ({ isOpen, onClose, children, title }) => {
  const { selectedTask, setSelectedTask, deleteTask } = useTasks();
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-150">
        {/* header */}
        <div className="flex flex-col justify-center gap-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-stone-900">{title}</h3>
            <div className="flex items-center gap-x-3">
              {selectedTask && (
                <button
                  onClick={async () => {
                    deleteTask(selectedTask.id);
                    setSelectedTask(null);
                    onClose();
                  }}
                  className="rounded-full text-[12px] py-1 px-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  Delete task
                </button>
              )}

              <button
                onClick={onClose}
                className="rounded-full p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-600 cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          {selectedTask && (
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-[10px]">{selectedTask.title}</h4>
              <div className="flex items-center">
                {selectedTask.startedAt && (
                  <span className="block text-[8px]">
                    Start:
                    <span className="text-green-700 px-1 text-[10px] font-medium">
                      {formatDate(selectedTask.startedAt)}
                    </span>
                  </span>
                )}

                {selectedTask.endedAt && (
                  <span className="block text-[8px]">
                    End:
                    <span className="text-red-700 px-1 text-[10px] font-medium">
                      {formatDate(selectedTask.startedAt)}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* content */}
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
