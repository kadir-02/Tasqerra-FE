"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormLabel from "./FormLabel";

type Props = {
  label: string;
  inputProps: UseFormRegisterReturn;
  disabled?: boolean;
  error?: FieldError;
  type?: string;
  showIcon?: React.ReactNode;
  required?: boolean;
};

export default function FormInput({
  label,
  disabled = false,
  inputProps,
  error,
  type = "text",
  showIcon,
  required,
}: Props) {
  return (
    <div className="relative mb-4">
      <FormLabel label={label} required={required} />
      <div className="flex items-center relative">
        <input
          type={type}
          {...inputProps}
          className={`w-full p-3 text-gray-700 rounded bg-(--background) focus:outline-none focus:ring-none transition-colors
            ${disabled ? "text-gray-500 cursor-not-allowed border border-[#f2f2f2]" : ""}`}
          disabled={disabled}
        />
        {showIcon && (
          <div className="absolute right-2 flex items-center">{showIcon}</div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
