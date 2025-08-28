"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/add-input";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { fieldMappings, sections } from "./data";
import axiosInstance from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { documentTypes } from "@/lib/utils";
import { useUserFormResponses } from "@/api/assistant";
import Loader from "@/components/ui/loader";

export default function ClientIntakeForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: voiceBotData, refetch } = useUserFormResponses();
  const searchParams = useSearchParams();
  const callId = searchParams.get("query");

  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
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
    console.log("🚀 ~ ClientIntakeForm ~ callId:", callId);
    console.log("🚀 ~ ClientIntakeForm ~ user?.user_id:", user?.user_id);
    if (!callId || !user?.user_id) return;

    setLoading(true);

    const timer = setTimeout(async () => {
      console.log("🚀 ~ ClientIntakeForm ~ callId:", callId);
      console.log("🚀 ~ ClientIntakeForm ~ user?.user_id:", user?.user_id);
      try {
        const res = await axiosInstance.post(`/call-info/${user.user_id}`, {
          call_id: callId,
        });
        console.log("🚀 ~ ClientIntakeForm ~ res:", res.data);

        refetch();
        localStorage.removeItem("callId");
        router.replace("/client/dashboard/client-intake-form");
      } catch (error) {
        console.error("Error fetching call info:", error);
      } finally {
        setLoading(false);
      }
    }, 60_000);

    return () => clearTimeout(timer);
  }, [callId, user?.user_id]);

  const fillFormWithPriorityData = () => {
    const initialValues: Record<string, string> = {};

    if (voiceBotData) {
      Object.entries(voiceBotData).forEach(([key_name, key_value]) => {
        const formFieldId = mapVoiceBotKeyToFormField(key_name);

        if (formFieldId) {
          initialValues[formFieldId] = String(key_value);
        } else {
        }
      });
    }

    documentTypes.forEach(({ type }) => {
      const saved = localStorage.getItem(`doc_${type}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.response) {
          const typeMapping = fieldMappings[type] || {};
          Object.entries(parsed.response).forEach(([ocrKey, value]) => {
            const formFieldId = typeMapping[ocrKey];
            if (formFieldId && value && !initialValues[formFieldId]) {
              initialValues[formFieldId] = String(value);
            }
          });
        }
      }
    });

    const missingFields = sections.flatMap((section) =>
      section.fields
        .filter((field) => !initialValues[field.id] && field.required)
        .map((field) => field.id)
    );

    const defaultValues: Record<string, string> = {
      immigration_application: initialValues.immigration_application || "true",
    };

    if (
      initialValues.immigration_application &&
      typeof initialValues.immigration_application === "string"
    ) {
      if (
        initialValues.immigration_application !== "true" &&
        initialValues.immigration_application !== "false"
      ) {
        defaultValues.immigration_details =
          initialValues.immigration_application;
        defaultValues.immigration_application = "true";
      }
    }

    if (initialValues.father_address && !initialValues.father_place_of_birth) {
      const fatherCity = initialValues.father_address.split(",")[0]?.trim();
      if (fatherCity) {
        defaultValues.father_place_of_birth = fatherCity;
      }
    }

    if (initialValues.mother_address && !initialValues.mother_place_of_birth) {
      const motherCity = initialValues.mother_address.split(",")[0]?.trim();
      if (motherCity) {
        defaultValues.mother_place_of_birth = motherCity;
      }
    }

    if (!initialValues.father_name) {
      defaultValues.father_name = "Not provided by voice bot";
    }

    if (!initialValues.mother_name) {
      defaultValues.mother_name = "Not provided by voice bot";
    }

    if (initialValues.father_dob) {
      try {
        const date = new Date(initialValues.father_dob);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().split("T")[0];
          defaultValues.father_dob = formattedDate;
        }
      } catch (error) {}
    }

    if (initialValues.mother_dob) {
      try {
        const date = new Date(initialValues.mother_dob);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().split("T")[0];
          defaultValues.mother_dob = formattedDate;
        }
      } catch (error) {}
    }

    const finalValues = { ...initialValues, ...defaultValues };
    setValues(finalValues);
  };

  const mapVoiceBotKeyToFormField = (key: string): string | null => {
    const keyMappings: Record<string, string> = {
      // Personal Information
      full_legal_name: "legal_name",
      height: "height",
      weight: "weight",
      eye_color: "eye_color",
      hair_color: "hair_color",
      phone_number: "phone_number",
      email_address: "email_address",
      marital_status: "marital_status",
      current_address: "current_address",

      // Children Information
      children_info: "children_info",
      number_of_children: "number_of_children",

      // Father Information - ALL FIELDS NOW PROPERLY MAPPED
      father_dob: "father_dob",
      father_residence: "father_address", // Maps to father_address field
      father_country_birth: "father_country",

      // Mother Information - ALL FIELDS NOW PROPERLY MAPPED
      mother_dob: "mother_dob",
      mother_residence: "mother_address", // Maps to mother_address field
      mother_country_birth: "mother_country",

      // Immigration and Legal - ALL FIELDS NOW PROPERLY MAPPED
      immigration_application: "immigration_application",
      arrest_history: "arrest_history",
      has_lived_in_usa: "has_lived_in_usa",

      // Additional fields
      address_history: "address_history",
      previous_marriage: "previous_marriage",
      employment_history: "employment_history",
    };

    return keyMappings[key] || null;
  };

  useEffect(() => {
    const responses: Record<string, any> = {};
    const fileUrls: Record<string, string> = {};

    documentTypes.forEach(({ type }) => {
      const saved = localStorage.getItem(`doc_${type}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.response) {
          responses[type] = parsed.response;
        }
        if (parsed?.fileUrl) {
          fileUrls[type] = parsed.fileUrl;
        }
      }
    });

    setDocumentResponses(responses);
    setDocumentFileUrls(fileUrls);
  }, []);

  useEffect(() => {
    fillFormWithPriorityData();
  }, [voiceBotData]);

  useEffect(() => {
    const updatedVisibility: Record<string, boolean> = {};

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.dependsOn) {
          const { field: depField, value } = field.dependsOn;
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader text="Please wait while we load call info..." />
      </div>
    );

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

      <div className="flex flex-row items-center gap-x-[20px] mt-8">
        <button
          onClick={handleSubmit}
          className="inline-flex  cursor-pointer items-center px-6 py-3 rounded-md bg-blue-primary text-white shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        <button
          onClick={() => router.push("/client/dashboard/talk-to-bot")}
          className="inline-flex  cursor-pointer items-center px-6 py-[10px] rounded-md bg-transparent text-blue-primary border border-blue-primary shadow hover:bg-blue-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Retry Voice Bot
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </>
  );
}
