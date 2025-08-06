"use client";

import React from "react";
import InputField, { FieldMeta } from "@/components/ui/add-input";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useClientStatusTable, useRegisterClient } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/validation/auth";

function AddClient() {
  const { user } = useAuth();
  const { push } = useRouter();
  const lawyerId = user?.user_id ?? "";

  const { refetch } = useClientStatusTable();

  const fields: FieldMeta[] = [
    {
      id: "full_name",
      label: "Full Name",
      placeholder: "Hafiz Ahmad Ismail",
      type: "text",
      icon: User,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "ahmadansari55@gmail.com",
      type: "email",
      icon: Mail,
    },
    {
      id: "phone",
      label: "Phone",
      placeholder: "+92 335858669",
      type: "tel",
      icon: Phone,
    },
    {
      id: "form_type",
      label: "Form Type",
      placeholder: "Select",
      type: "select",
      options: [
        { value: "I130", label: "I-130" },
        { value: "I485", label: "I-485" },
      ],
    },
    {
      id: "username",
      label: "User Name",
      placeholder: "Ahmad Ismail",
      type: "text",
      icon: User,
    },
    {
      id: "password",
      label: "Password",
      placeholder: "••••••••",
      type: "password",
      icon: Lock,
    },
  ];

  type ClientFormValues = z.infer<typeof clientSchema>;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      form_type: "",
      username: "",
      password: "",
    },
  });

  const { mutateAsync: registerClient, isPending } = useRegisterClient(
    () => console.log("Client registered!"),
    (msg) => console.log(msg)
  );

  const onSubmit = async (data: ClientFormValues) => {
    try {
      await registerClient({
        ...data,
        created_by: lawyerId,
      });
      push("/lawyer/client-management");
      refetch();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-[20px]">
        Enter Client Details
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]"
      >
        {fields.map((f) => (
          <div key={f.id}>
            <Controller
              name={f.id as keyof ClientFormValues}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  {...f}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={error?.message}
                />
              )}
            />
          </div>
        ))}
        <div className="md:col-span-2 flex justify-start mt-4">
          <button
            type="submit"
            disabled={isPending || isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPending ? "Submitting..." : "Next"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddClient;
