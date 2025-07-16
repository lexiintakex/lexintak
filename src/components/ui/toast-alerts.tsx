import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import React from "react";

type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastAlertProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-green-100 text-green-700 border border-green-200",
  info: "bg-blue-100 text-blue-700 border border-blue-200",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  error: "bg-red-100 text-red-700 border border-red-200",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 mt-0.5 mr-1.5" />,
  info: <Info className="w-4 h-4 mt-0.5 mr-1.5" />,
  warning: <AlertTriangle className="w-4 h-4 mt-0.5 mr-1.5" />,
  error: <AlertCircle className="w-4 h-4 mt-0.5 mr-1.5" />,
};

export default function ToastAlert({
  message,
  variant = "info",
  onClose,
}: ToastAlertProps) {
  return (
    <div
      className={`w-full px-4 py-2 rounded-md flex justify-between items-start gap-2 text-sm ${variantStyles[variant]}`}
    >
      <div className="flex items-start gap-2">
        {variantIcons[variant]}
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-inherit cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
