"use client";

import React, { useState } from "react";
import { File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const UploadDocuments = () => {
  type DocumentStatus = keyof typeof statusMap;
  const [documents] = useState<Record<string, DocumentStatus>>(
    Object.fromEntries(documentTypes.map((doc) => [doc, "required"]))
  );
  type Upload = {
    name: string;
    size: string;
    status: "uploading" | "success" | "error";
  };
  const { push } = useRouter();

  const [uploads, setUploads] = useState<Upload[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const uploaded: Upload[] = Array.from(files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}kb`,
      status: "uploading" as const,
    }));
    setUploads([...uploads, ...uploaded]);

    setTimeout(() => {
      setUploads((prev) =>
        prev.map((f, i) =>
          i % 2 === 0 ? { ...f, status: "success" } : { ...f, status: "error" }
        )
      );
    }, 1500);
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

      {/* File upload section */}
      <div className="border-2 cursor-pointer border-dashed border-blue-200 mt-6 p-6 rounded-md bg-blue-50 text-center">
        <p className="text-sm mb-1 font-medium text-gray-700">
          Drag images here or browse to select files
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Attach as many files as you like, each file should not exceed 5mb
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

      <div className=" grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-[30px]">
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
                    <span className="text-blue-500 text-xs underline cursor-pointer">
                      Click to view
                    </span>
                  )}
                  {file.status === "error" && (
                    <div className="text-red-600 text-xs">
                      Upload failed, please try again
                      <br />
                      <span className="underline cursor-pointer">
                        {file.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Trash2 className="text-gray-400 w-4 h-4 cursor-pointer" />
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

      <div className="mt-6">
        <Button
          variant="outline"
          className="bg-blue-primary text-white cursor-pointer"
          onClick={() => push("/client/dashboard/select-bot")}
        >
          Skip Now
        </Button>
      </div>
    </div>
  );
};

export default UploadDocuments;
