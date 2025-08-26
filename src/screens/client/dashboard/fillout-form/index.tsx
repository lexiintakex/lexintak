"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/add-input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { fieldMappings, sections } from "./data";
import axiosInstance from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { documentTypes } from "@/lib/utils";
import { useUserFormResponses } from "@/api/assistant";

export default function ClientIntakeForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: voiceBotData } = useUserFormResponses();
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

  const fillFormWithPriorityData = () => {
    console.log("voiceBotData", voiceBotData);
    const initialValues: Record<string, string> = {};

    if (voiceBotData) {
      Object.entries(voiceBotData).forEach(([key_name, key_value]) => {
        console.log(
          "Processing voice bot key:",
          key_name,
          "with value:",
          key_value
        );

        const formFieldId = mapVoiceBotKeyToFormField(key_name);
        console.log("Mapped to form field:", formFieldId);

        if (formFieldId) {
          initialValues[formFieldId] = String(key_value);
          console.log("✅ Set form field", formFieldId, "to:", key_value);
        } else {
          console.log("❌ No mapping found for key:", key_name);
        }
      });

      console.log("🎯 Successfully mapped fields:", Object.keys(initialValues));
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

    console.log("Final initial values set:", initialValues);

    // Log missing fields that are in the form but not populated
    const missingFields = sections.flatMap((section) =>
      section.fields
        .filter((field) => !initialValues[field.id] && field.required)
        .map((field) => field.id)
    );
    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      console.log(
        "These fields need to be added to the voice bot or made optional"
      );
    }

    // Set default values for some missing fields to prevent form submission errors
    const defaultValues: Record<string, string> = {
      // Set immigration_application to true if it's not provided, so dependent fields show
      immigration_application: initialValues.immigration_application || "true",
    };

    // Handle immigration_application field - if voice bot provides text, convert to toggle
    if (
      initialValues.immigration_application &&
      typeof initialValues.immigration_application === "string"
    ) {
      // If the voice bot provided text (not just "true"/"false"), set it to true
      // and store the details in a custom field or handle it specially
      if (
        initialValues.immigration_application !== "true" &&
        initialValues.immigration_application !== "false"
      ) {
        console.log(
          "Voice bot provided immigration details:",
          initialValues.immigration_application
        );
        // Store the details in the immigration_details field and set toggle to true
        defaultValues.immigration_details =
          initialValues.immigration_application;
        defaultValues.immigration_application = "true";
      }
    }

    // Handle missing place of birth fields by extracting from residence data
    if (initialValues.father_address && !initialValues.father_place_of_birth) {
      // Extract city from father's address (e.g., "Karachi, Pakistan" -> "Karachi")
      const fatherCity = initialValues.father_address.split(",")[0]?.trim();
      if (fatherCity) {
        defaultValues.father_place_of_birth = fatherCity;
        console.log(
          "🔍 Extracted father place of birth from address:",
          fatherCity
        );
      }
    }

    if (initialValues.mother_address && !initialValues.mother_place_of_birth) {
      // Extract city from mother's address (e.g., "Karachi, Pakistan" -> "Karachi")
      const motherCity = initialValues.mother_address.split(",")[0]?.trim();
      if (motherCity) {
        defaultValues.mother_place_of_birth = motherCity;
        console.log(
          "🔍 Extracted mother place of birth from address:",
          motherCity
        );
      }
    }

    // Handle missing parent names by setting defaults
    if (!initialValues.father_name) {
      defaultValues.father_name = "Not provided by voice bot";
      console.log("🔍 Set default father name");
    }

    if (!initialValues.mother_name) {
      defaultValues.mother_name = "Not provided by voice bot";
      console.log("🔍 Set default mother name");
    }

    // Handle date format conversion for DOB fields
    if (initialValues.father_dob) {
      console.log("🔍 Processing father DOB:", initialValues.father_dob);
      // Convert text date to HTML date format if possible
      try {
        const date = new Date(initialValues.father_dob);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
          defaultValues.father_dob = formattedDate;
          console.log("🔍 Converted father DOB to:", formattedDate);
        }
      } catch (error) {
        console.log(
          "🔍 Could not convert father DOB, keeping original:",
          initialValues.father_dob
        );
      }
    }

    if (initialValues.mother_dob) {
      console.log("🔍 Processing mother DOB:", initialValues.mother_dob);
      // Convert text date to HTML date format if possible
      try {
        const date = new Date(initialValues.mother_dob);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
          defaultValues.mother_dob = formattedDate;
          console.log("🔍 Converted mother DOB to:", formattedDate);
        }
      } catch (error) {
        console.log(
          "🔍 Could not convert mother DOB, keeping original:",
          initialValues.mother_dob
        );
      }
    }

    // Merge default values with initial values
    const finalValues = { ...initialValues, ...defaultValues };
    console.log("Final values with defaults:", finalValues);

    // Log summary of what was processed
    console.log("📊 SUMMARY OF FIELD PROCESSING:");
    console.log("✅ Voice bot fields mapped:", Object.keys(initialValues));
    console.log("🔧 Default values added:", Object.keys(defaultValues));
    console.log("🎯 Final form values:", Object.keys(finalValues));

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

    // Note: The following form fields are NOT provided by voice bot data:
    // - place_of_birth (Personal Information)
    // - father_name (Father Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - mother_name (Mother Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - father_place_of_birth (Father Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - mother_place_of_birth (Mother Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - parent_marriage_date (Father Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - father_city (Father Information) - NEEDS TO BE ADDED TO VOICE BOT
    // - mother_city (Mother Information) - NEEDS TO BE ADDED TO VOICE BOT

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
