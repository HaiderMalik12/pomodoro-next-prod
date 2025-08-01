import React from "react";
import clsx from "clsx";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
