"use client";

import React, { useState } from "react";
import { File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

const documentTypes = [
  "Passport & Green Card",
  "Birth Certificates",
  "Marriage Certificates",
  "State IDs or Driver's Licenses",
  "Work Authorization Cards (EAD)",
  "Previous visa applications",
];

const statusMap = {
  required: "Required",
  in_progress: "In Progress",
  completed: "Completed",
};

type DocumentStatus = keyof typeof statusMap;

type Upload = {
  name: string;
  size: string;
  file: File;
  status: "uploading" | "success" | "error";
};

export default function UploadDocuments() {
  const [documents] = useState<Record<string, DocumentStatus>>(
    Object.fromEntries(documentTypes.map((doc) => [doc, "required"]))
  );
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const { push } = useRouter();

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploaded: Upload[] = Array.from(files).map((file) => {
      const isAllowed = allowedTypes.includes(file.type);
      return {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}kb`,
        status: isAllowed ? "uploading" : "error",
        file,
      };
    });

    setUploads((prev) => [...prev, ...uploaded]);

    setTimeout(() => {
      setUploads((prev) =>
        prev.map((f) =>
          f.status === "uploading" ? { ...f, status: "success" } : f
        )
      );
    }, 1500);
  };

  const handleDelete = () => {
    if (fileToDelete === null) return;
    setUploads((prev) => prev.filter((_, i) => i !== fileToDelete));
    setFileToDelete(null);
  };

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map((doc) => (
          <div
            key={doc}
            className={`rounded-md border border-blue-primary p-4 flex flex-col justify-between shadow-sm relative bg-white`}
          >
            <div className="flex flex-col items-start text-center">
              <div className="bg-[#EAF1FF] p-3 rounded-xl flex justify-center items-center">
                <Image
                  src="/assets/dashboard/file-sample.svg"
                  alt="File"
                  width={30}
                  height={30}
                  className="w-auto h-auto"
                />
              </div>
              <span className="text-blue-primary mt-2 font-semibold text-lg">
                {doc}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full border ${
                  documents[doc] === "in_progress"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {statusMap[documents[doc]]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 cursor-pointer border-dashed border-blue-200 mt-6 p-6 rounded-md bg-blue-50 text-center">
        <p className="text-sm mb-1 font-medium text-gray-700">
          Drag files here or browse to select
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Only PDF, DOCX, XLSX allowed. Max 5MB each.
        </p>
        <label className="inline-block cursor-pointer bg-blue-primary text-white px-4 py-2 rounded-md">
          Browse
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-[30px]">
        {uploads.map((file, i) => (
          <div
            key={i}
            className={`px-4 py-2 border rounded-md bg-white ${
              file.status === "error" ? "border-red-400 bg-red-50" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="text-blue-500" />
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-gray-700">{file.name}</span>
                  {file.status === "success" && (
                    <span
                      className="text-blue-500 text-xs underline cursor-pointer"
                      onClick={() => setViewingFile(file.file)}
                    >
                      Click to view
                    </span>
                  )}
                  {file.status === "error" && (
                    <div className="text-red-600 text-xs">
                      Unsupported file type.
                      <br />
                      <span className="underline">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <Trash2
                className="text-gray-400 w-4 h-4 cursor-pointer"
                onClick={() => setFileToDelete(i)}
              />
            </div>

            {file.status === "success" && (
              <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
            {file.status === "uploading" && (
              <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {uploads.some((f) => f.status === "error") && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mt-6 text-sm">
          Some files failed to upload. Please remove or reupload them to
          continue.
        </div>
      )}

      {uploads.length > 0 && (
        <button
          onClick={() => setUploads([])}
          className="text-sm text-gray-500 underline hover:text-gray-700 mt-4"
        >
          Clear All Uploaded Files
        </button>
      )}

      {(uploads.length === 0 ||
        uploads.every((f) => f.status === "success")) && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {uploads.length > 0 &&
            uploads.every((f) => f.status === "success") && (
              <Button
                className="bg-blue-primary text-white cursor-pointer"
                onClick={() => push("/client/dashboard/select-bot")}
              >
                All Documents Uploaded — Continue
              </Button>
            )}

          <Button
            variant="outline"
            className="text-gray-600"
            onClick={() => push("/client/dashboard/select-bot")}
          >
            Skip for now
          </Button>

          <p className="text-sm text-gray-500">
            You can upload documents later in your dashboard.
          </p>
        </div>
      )}

      {viewingFile && (
        <Modal
          isOpen={true}
          width="max-w-3xl"
          title="Preview Document"
          onClose={() => setViewingFile(null)}
        >
          <iframe
            src={URL.createObjectURL(viewingFile)}
            className="w-full h-[500px]"
            frameBorder="0"
          ></iframe>
        </Modal>
      )}

      {fileToDelete !== null && (
        <Modal
          isOpen={true}
          title="Confirm Delete"
          onClose={() => setFileToDelete(null)}
          onConfirm={handleDelete}
          confirmText="Delete"
        >
          Are you sure you want to delete this file?
        </Modal>
      )}
    </div>
  );
}
