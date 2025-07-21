"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional confirm handler => shows default Cancel/Confirm footer */
  onConfirm?: () => void;
  confirmText?: string;
  title?: string;
  /** Custom footer JSX overrides default footer */
  footer?: React.ReactNode;
  width?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  title,
  children,
  footer,
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
            className="text-gray-primary hover:text-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="border-t px-6 py-4">{footer}</div>
        ) : onConfirm ? (
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-smv cursor-pointer font-medium border border-blue-primary text-blue-primary rounded-md hover:bg-blue-primary hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              {confirmText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
