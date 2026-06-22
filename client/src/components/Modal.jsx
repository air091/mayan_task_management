import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-150">
        {/* header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-600 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* content */}
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
