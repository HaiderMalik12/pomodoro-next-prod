import React, { forwardRef } from "react";
import clsx from "clsx";

type InputProps = {
  label: string;
  name?: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, className, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col space-y-1", className)}>
        <label className="text-sm font-medium" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          className={clsx(
            "px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
