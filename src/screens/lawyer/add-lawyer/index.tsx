"use client";

import InputField, { FieldMeta } from "@/components/ui/add-input";
import React from "react";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useRegisterLawyer } from "@/api/lawyer";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

function AddLawyer() {
  const { mutateAsync: registerLawyer, isPending } = useRegisterLawyer();
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerLawyer(data);
      push("/lawyer/settings");
    } catch (error) {
      console.error("error", error);
    }
  };

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

  return (
    <>
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-[20px]">
        Enter Lawyer Details
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]"
      >
        {fields.map((f) => (
          <Controller
            key={f.id}
            name={f.id as keyof FormData}
            control={control}
            render={({ field }) => (
              <InputField
                {...f}
                value={field.value ?? ""}
                onChange={field.onChange}
                error={errors[f.id as keyof FormData]?.message as string}
              />
            )}
          />
        ))}

        <div className="md:col-span-2 flex justify-start mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPending ? "Saving..." : "Next"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddLawyer;
