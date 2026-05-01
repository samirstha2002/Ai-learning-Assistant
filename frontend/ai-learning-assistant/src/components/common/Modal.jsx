import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-2xl p-8 z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="mb-6 pr-8">
            <h3 className="text-xl font-medium text-slate-900">{title}</h3>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
