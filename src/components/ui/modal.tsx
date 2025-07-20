"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  title,
  children,
  width = "max-w-lg",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 px-4">
      <div
        className={`relative bg-white rounded-lg shadow-lg w-full ${width} max-h-[90vh] overflow-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {title ?? "Modal"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-primary  cursor-pointer hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {onConfirm && (
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-blue-primary cursor-pointer border border-blue-primary rounded-md hover:text-white transition-all hover:bg-blue-primary"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium cursor-pointer text-white bg-red-600 hover:bg-red-700 rounded"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
