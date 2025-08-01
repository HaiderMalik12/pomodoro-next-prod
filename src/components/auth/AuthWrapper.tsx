import React from "react";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Add Logo or heading here */}
        <div className="mb-6 text-center text-2xl font-bold text-gray-800">
          Pomodoro App
        </div>
        {children}
      </div>
    </div>
  );
}
