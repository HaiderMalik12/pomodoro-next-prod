"use client";

import React, { useState } from "react";

const Verify2FA: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Replace with your API call
    try {
      // Example: await verify2FA(code);
      if (code === "123456") {
        setSuccess(true);
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">
        Verify Two-Factor Authentication
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <label htmlFor="code" className="block mb-2 font-medium">
          Enter your 2FA code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          maxLength={6}
          required
          autoFocus
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && (
          <p className="text-green-500 mb-2">Verification successful!</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default Verify2FA;
