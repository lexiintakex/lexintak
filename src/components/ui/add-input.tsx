"use client";

import clsx from "clsx";
import React from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface FieldMeta {
  id: string;
  label: string;
  placeholder?: string;
  type?:
    | React.HTMLInputTypeAttribute
    | "select"
    | "checkbox"
    | "toggle"
    | "date";
  icon?: React.ElementType;
  options?: { value: string; label: string }[];
  subToggle?: { leftLabel: string; rightLabel: string };
  bottomCheckbox?: { id: string; label: string };
  colSpan?: 1 | 2 | 3 | 4;
}

interface InputFieldProps extends FieldMeta {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  extraValues?: Record<string, string>;
  onExtraChange?: (id: string, value: string) => void;
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
  subToggle,
  bottomCheckbox,
  extraValues,
  onExtraChange,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";
  const displayedType =
    isPassword && !showPassword
      ? "password"
      : type === "date"
      ? "date"
      : "text";

  const commonInput =
    "w-full py-2 pr-3 text-sm placeholder:text-gray-400 outline-none focus:ring-0 bg-[#F9F9F9]";

  if (type === "checkbox" || type === "toggle") {
    return (
      <fieldset className={clsx("space-y-1", className)}>
        <legend className="text-sm font-medium text-[#1E3A8A]">{label}</legend>
        <div className="flex items-center gap-2 mt-[2px]">
          {type === "toggle" ? (
            <>
              <span className="text-xs text-gray-600">No</span>
              <SwitchPrimitive.Root
                id={id}
                checked={value === "true"}
                onCheckedChange={(c) => onChange(c.toString())}
                className="relative h-5 w-9 rounded-full bg-gray-300 data-[state=checked]:bg-blue-600 transition-colors"
              >
                <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
              </SwitchPrimitive.Root>
              <span className="text-xs text-gray-600">Yes</span>
            </>
          ) : (
            <label className="inline-flex items-center gap-2">
              <input
                id={id}
                type="checkbox"
                checked={value === "true"}
                onChange={(e) => onChange(e.target.checked.toString())}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-xs text-gray-600">Yes</span>
            </label>
          )}
        </div>
      </fieldset>
    );
  }

  return (
    <div>
      <fieldset
        className={clsx(
          "relative border-l-[4] border border-blue-primary rounded-md px-3 pb-2 bg-[#F9F9F9]",
          className
        )}
      >
        <legend className="text-xs font-medium text-[#1E3A8A] px-1 ml-2">
          {label}
        </legend>

        <div className="relative flex items-center">
          {Icon && <Icon className="absolute text-gray-500 w-4 h-4" />}
          {type === "select" ? (
            <SelectPrimitive.Root
              value={value ?? ""}
              onValueChange={onChange}
              defaultValue=""
            >
              <SelectPrimitive.Trigger
                id={id}
                className="flex h-10 w-full items-center justify-between bg-transparent pl-9 pr-3 text-sm outline-none"
              >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon asChild>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Content className="z-50 bg-white rounded-md shadow p-1">
                  <SelectPrimitive.Viewport>
                    {options?.map((opt) => (
                      <SelectPrimitive.Item
                        key={opt.value}
                        value={opt.value ?? ""}
                        className="cursor-pointer px-3 py-1.5 text-sm rounded hover:bg-blue-100"
                      >
                        <SelectPrimitive.ItemText>
                          {opt.label}
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
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              className={clsx(
                commonInput,
                Icon ? "pl-7" : "pl-3",
                isPassword ? "pr-10" : ""
              )}
            />
          )}

          {/* eye toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 text-gray-500"
              aria-label="Toggle password"
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

      {subToggle && (
        <div className="mt-1 flex items-center gap-2 pl-1">
          <span className="text-[14px] text-blue-primary">
            {subToggle.leftLabel}
          </span>
          <SwitchPrimitive.Root
            id={`${id}-unit`}
            checked={value.endsWith("metric")}
            onCheckedChange={() => {
              const metric = value.endsWith("metric");
              onChange(
                metric ? value.replace(/metric$/, "") : `${value}metric`
              );
            }}
            className="relative h-4 w-8 rounded-full bg-gray-300 data-[state=checked]:bg-blue-600 transition-colors"
          >
            <SwitchPrimitive.Thumb className="block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[14px]" />
          </SwitchPrimitive.Root>
          <span className="text-[14px] text-blue-primary">
            {subToggle.rightLabel}
          </span>
        </div>
      )}

      {bottomCheckbox && (
        <div className="mt-2 flex items-center gap-2 pl-1">
          <input
            id={bottomCheckbox.id}
            type="checkbox"
            checked={extraValues?.[bottomCheckbox.id] === "true"}
            onChange={(e) =>
              onExtraChange?.(bottomCheckbox.id, e.target.checked.toString())
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={bottomCheckbox.id}
            className="text-sm font-medium text-gray-700"
          >
            {bottomCheckbox.label}
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
}
