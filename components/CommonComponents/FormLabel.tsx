"use client";

import React from "react";

type Props = {
  label: string;
  required?: boolean;
};

const FormLabel = ({ label, required }: Props) => {
  return (
    <label className="block text-start text-xs md:text-sm text-gray-700">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default FormLabel;
