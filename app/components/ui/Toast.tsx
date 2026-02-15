"use client";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const typeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-hirovo-blue",
};

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`${typeStyles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 min-w-[280px] animate-slide-up`}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Array<{ id: string; message: string; type: "success" | "error" | "info" }>;
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
