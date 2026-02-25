"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

type Props = {
  title: string;
  loading?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

const LoadingButton = ({ title, loading, success, icon, className }: Props) => {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (success) {
      setShowCheck(true);
      const timer = setTimeout(() => setShowCheck(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <button
      type="submit"
      disabled={loading}
      className={`group min-h-10 px-6 py-3 rounded-lg w-full
        bg-(--primary) text-white 
        hover:bg-(--primary-dark)
        disabled:opacity-50 disabled:cursor-not-allowed
        flex justify-center items-center gap-2 
        transition-all duration-300 shadow-md hover:shadow-lg
        ${className}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : showCheck ? (
        <Check className="w-5 h-5 text-white" />
      ) : (
        <>
          {title} {icon}
        </>
      )}
    </button>
  );
};

export default LoadingButton;
