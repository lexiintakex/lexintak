"use client";
import { useState, useEffect } from "react";
import Modal from "./modal";

interface Props {
  open: boolean;
  current: string;
  onSave: (newNote: string) => void;
  onClose: () => void;
}

export default function CaseNotesModal({
  open,
  current,
  onSave,
  onClose,
}: Props) {
  const [val, setVal] = useState(current);
  useEffect(() => setVal(current), [current]);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Edit Case Note"
      width="max-w-3xl"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2  cursor-pointer rounded bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(val)}
            className="px-4 cursor-pointer py-2 rounded bg-blue-primary text-white"
          >
            Save
          </button>
        </div>
      }
    >
      <textarea
        rows={10}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full p-3 border outline-none border-blue-primary rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </Modal>
  );
}
