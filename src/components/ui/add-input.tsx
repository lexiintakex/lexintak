"use client";

import clsx from "clsx";
import React from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

export interface FieldMeta {
  id: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | "select";
  icon?: React.ElementType;
  options?: { value: string; label: string }[];
}

interface InputFieldProps extends FieldMeta {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InputField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  icon: Icon,
  options,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const displayedType = isPassword && !showPassword ? "password" : "text";

  return (
    <fieldset
      className={clsx(
        "relative border-l-[4] border-t-1 border-r-[1] bg-[#F9F9F9] border-b-[1] border-blue-primary rounded-md px-3 pb-2",
        className
      )}
    >
      <legend className="text-xs font-medium text-[#1E3A8A] px-1 ml-2">
        {label}
      </legend>
      <div className="relative flex items-center">
        {/* Blue accent bar */}
        {Icon && <Icon className="absolute text-gray-500 w-4 h-4" />}
        {type === "select" ? (
          <SelectPrimitive.Root value={value} onValueChange={onChange}>
            <SelectPrimitive.Trigger
              id={id}
              className="flex h-10 w-full items-center justify-between rounded-md border-none bg-transparent pl-9 pr-3 py-2 text-sm outline-none focus:ring-0 data-[placeholder]:text-gray-400"
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon asChild>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                <SelectPrimitive.Viewport className="p-1">
                  {options?.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          {/* You can add a checkmark icon here if desired */}
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>
                        {option.label}
                      </SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        ) : (
          <input
            id={id}
            type={displayedType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(
              "w-full py-2 pr-3 text-sm placeholder:text-gray-400 outline-none focus:ring-0 bg-[#F9F9F9]",
              Icon ? "pl-7" : "pl-3",
              isPassword ? "pr-10" : ""
            )}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </fieldset>
  );
}
