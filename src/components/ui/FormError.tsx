import React from "react";

type FormErrorProps = { message: string };

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
      {message}
    </div>
  );
}
