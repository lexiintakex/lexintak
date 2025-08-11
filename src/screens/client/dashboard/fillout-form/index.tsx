"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/add-input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { fieldMappings, sections } from "./data";
import { documentTypes } from "../files/UploadFile";
import axiosInstance from "@/lib/axios";
import useAuth from "@/hooks/useAuth";

export default function ClientIntakeForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [documentResponses, setDocumentResponses] = useState<
    Record<string, any>
  >({});
  const [documentFileUrls, setDocumentFileUrls] = useState<
    Record<string, string>
  >({});

  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const responses: Record<string, any> = {};
    const fileUrls: Record<string, string> = {};
    const initialValues: Record<string, string> = {};

    documentTypes.forEach(({ type }) => {
      const saved = localStorage.getItem(`doc_${type}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.response) {
          responses[type] = parsed.response;

          const typeMapping = fieldMappings[type] || {};
          Object.entries(parsed.response).forEach(([ocrKey, value]) => {
            const formFieldId = typeMapping[ocrKey];
            if (formFieldId && value) {
              initialValues[formFieldId] = String(value);
            }
          });
        }

        if (parsed?.fileUrl) {
          fileUrls[type] = parsed.fileUrl;
        }
      }
    });

    setDocumentResponses(responses);
    setDocumentFileUrls(fileUrls);
    setValues(initialValues);
  }, []);

  useEffect(() => {
    const updatedVisibility: Record<string, boolean> = {};

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.dependsOn) {
          const { field: depField, value } = field.dependsOn;

          // Ensure both sides are strings
          updatedVisibility[field.id] =
            String(values[depField]) === String(value);
        } else {
          updatedVisibility[field.id] = true;
        }
      });
    });

    setVisibleFields(updatedVisibility);
  }, [values]);

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        const required = field.required ?? true;
        const visible = visibleFields[field.id];
        if (required && visible && !values[field.id]) {
          newErrors[field.id] = `${field.label || field.id} is required.`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const userId = user?.user_id;
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const checkRes = await axiosInstance.get(`/check-document/${userId}`);
      if (!checkRes.data.success) return;

      const formData = new FormData();
      formData.append("document_type", "identity_documents");

      for (const [docType, fileUrl] of Object.entries(documentFileUrls)) {
        const fileName = fileUrl.split("/").pop() || "uploaded-file";
        const file = await fetch(fileUrl).then((res) => res.blob());

        const metadata = new File([file], fileName, { type: file.type });
        formData.append("files", metadata, fileName);
        formData.append("file_types", docType);
      }

      const uploadRes = await axiosInstance.post("/upload-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadRes.data.success) {
        toast.error("Document upload failed.");
        return;
      }

      const { documents_id } = uploadRes.data;
      const res = await axiosInstance.post("/client-intake", {
        responses: values,
        language: "English",
        documents_id,
      });

      if (res.data.success) {
        documentTypes.forEach(({ type }) => {
          localStorage.removeItem(`doc_${type}`);
        });
        localStorage.removeItem("client-intake-values");

        router.push("/client/dashboard/success");
      } else {
        toast.error(res.data.message || "Submission failed.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="mt-10 first:mt-8">
          {(!section.dependsOn ||
            String(values[section.dependsOn.field]) ===
              String(section.dependsOn.value)) &&
            section.title && (
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                {section.title}
              </h2>
            )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.fields.map(
              (field) =>
                visibleFields[field.id] && (
                  <div key={field.id}>
                    <InputField
                      {...field}
                      value={values[field.id] ?? ""}
                      onChange={(val) => handleChange(field.id, val)}
                      extraValues={values}
                      onExtraChange={handleChange}
                    />
                    {errors[field.id] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </section>
      ))}

      <div className="flex justify-start mt-8">
        <button
          onClick={handleSubmit}
          className="inline-flex  cursor-pointer items-center px-6 py-3 rounded-md bg-blue-primary text-white shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </>
  );
}
