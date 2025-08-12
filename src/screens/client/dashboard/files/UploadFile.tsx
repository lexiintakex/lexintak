"use client";

import React, { useEffect, useState } from "react";
import { File, Trash2, Upload, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import axiosInstance from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

const statusMap = {
  required: "Required",
  in_progress: "In Progress",
  completed: "Completed",
  error: "Error",
};

type DocumentStatus = keyof typeof statusMap;

type DocumentUpload = {
  name: string;
  size: string;
  file: File;
  fileUrl?: string;
  status: "uploading" | "success" | "error" | "idle";
  type: string;
};

export default function UploadDocuments() {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);
  const [viewingFileUrl, setViewingFileUrl] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const { push } = useRouter();
  const { user } = useAuth();
  const documentTypes = user?.required_documents;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAllowed = allowedTypes.includes(file.type);
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const fileBase64 = `data:${file.type};base64,${base64}`;

    const newUpload: DocumentUpload = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}kb`,
      file,
      fileUrl: fileBase64,
      status: isAllowed ? "idle" : "error",
      type,
    };

    setUploads((prev) => [...prev.filter((u) => u.type !== type), newUpload]);
  };

  useEffect(() => {
    const savedUploads: DocumentUpload[] = [];

    documentTypes?.forEach((doc) => {
      const stored = localStorage.getItem(`doc_${doc.type}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        savedUploads.push({
          name: parsed.name,
          size: "",
          file: new window.File([""], parsed.name),
          fileUrl: parsed.fileUrl,
          status: "success",
          type: doc.type,
        });
      }
    });

    setUploads(savedUploads);
  }, []);

  const handleSubmitUpload = async (type: string) => {
    const upload = uploads.find((u) => u.type === type);
    if (!upload) return;

    setUploads((prev) =>
      prev.map((u) => (u.type === type ? { ...u, status: "uploading" } : u))
    );

    try {
      const res = await axiosInstance.post(`/parse/${type}`, upload.file, {
        headers: { "Content-Type": upload.file.type },
      });

      localStorage.setItem(
        `doc_${type}`,
        JSON.stringify({
          name: upload.name,
          response: res.data?.data ?? null,
          fileUrl: upload.fileUrl,
        })
      );

      setUploads((prev) =>
        prev.map((u) => (u.type === type ? { ...u, status: "success" } : u))
      );
    } catch (err) {
      console.error(err);
      setUploads((prev) =>
        prev.map((u) => (u.type === type ? { ...u, status: "error" } : u))
      );
    }
  };

  const handleDelete = () => {
    if (fileToDelete === null) return;
    const type = uploads[fileToDelete].type;
    localStorage.removeItem(`doc_${type}`);
    setUploads((prev) => prev.filter((_, i) => i !== fileToDelete));
    setFileToDelete(null);
  };

  const getDocumentStatus = (type: string): DocumentStatus => {
    const upload = uploads.find((u) => u.type === type);
    if (!upload) return "required";
    if (upload.status === "success") return "completed";
    if (upload.status === "error") return "error";
    return "in_progress";
  };

  return (
    <div className="py-6">
      <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-md p-4">
        <strong>Note:</strong> Please upload all the required documents one by
        one for verification purposes.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes?.map((doc) => {
          const status = getDocumentStatus(doc.type);
          const upload = uploads.find((u) => u.type === doc.type);

          return (
            <div
              key={doc.label}
              className="rounded-md border border-blue-primary p-4 flex flex-col justify-between shadow-sm relative bg-white min-h-[180px]"
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
                  {doc.label}
                </span>
              </div>

              <div className="absolute top-2 right-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full border ${
                    status === "in_progress"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : status === "completed"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : status === "error"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {statusMap[status]}
                </span>
              </div>

              <div className="mt-4">
                {!upload ? (
                  <label className="flex items-center justify-center gap-2 cursor-pointer bg-blue-primary text-white px-4 py-2 rounded-md text-sm">
                    <Upload className="w-4 h-4" />
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e, doc.type)}
                    />
                  </label>
                ) : upload.status === "idle" ? (
                  <Button
                    onClick={() => handleSubmitUpload(doc.type)}
                    className="w-full cursor-pointer  bg-blue-primary text-white"
                  >
                    Submit
                  </Button>
                ) : upload.status === "uploading" ? (
                  <Button
                    className="w-full cursor-pointer bg-blue-100 text-blue-800"
                    disabled
                  >
                    <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </Button>
                ) : upload.status === "error" ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="destructive"
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setUploads((prev) =>
                          prev.filter((u) => u.type !== doc.type)
                        );
                      }}
                    >
                      Remove
                    </Button>
                    <label className="flex items-center justify-center gap-2 cursor-pointer bg-blue-primary text-white px-4 py-2 rounded-md text-sm">
                      <RotateCw className="w-4 h-4" />
                      Retry Upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, doc.type)}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer"
                      onClick={() => setViewingFileUrl(upload.fileUrl || null)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => {
                        const index = uploads.findIndex(
                          (u) => u.type === doc.type
                        );
                        setFileToDelete(index);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {uploads.some((f) => f.status === "error") && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mt-6 text-sm">
          Some files failed to upload. Please remove or retry uploading them.
        </div>
      )}

      {uploads.length > 0 && uploads.every((u) => u.status === "success") && (
        <div className="mt-6 flex flex-row justify-between items-center gap-3">
          <Button
            className="bg-blue-primary text-white cursor-pointer"
            onClick={() => push("/client/dashboard/select-bot")}
          >
            All Documents Uploaded — Continue
          </Button>
          <Button
            variant="outline"
            className="text-gray-600 cursor-pointer"
            onClick={() => push("/client/dashboard/select-bot")}
          >
            Skip for now
          </Button>
        </div>
      )}

      {viewingFileUrl && (
        <Modal
          isOpen={true}
          width="max-w-3xl"
          title="Preview Document"
          onClose={() => setViewingFileUrl(null)}
        >
          <iframe
            src={viewingFileUrl}
            className="w-full h-[500px]"
            frameBorder="0"
          />
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
