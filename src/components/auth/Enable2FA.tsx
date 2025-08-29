"use client";

import { useState } from "react";

export default function Enable2FA() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const generateSecret = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/2fa/generate`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate 2FA secret");
      }

      const data = await response.json();
      setQrCode(data.qrCode); // Assuming the API returns a field named 'qrCode'
    } catch (error) {
      console.error("Error generating 2FA secret:", error);
    }
  };

  const enable2FA = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/2fa/enable`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify 2FA code");
      }

      const data = await response.json();
      if (data.success) {
        alert("2FA enabled successfully!");
      } else {
        alert("Invalid 2FA code. Please try again.");
      }
    } catch (error) {
      console.error("Error Enabling 2FA code:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Secure your account by enabling 2FA.
          </p>
        </div>

        {/* Enable 2FA Button */}
        <div className="flex justify-center">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl shadow transition"
            onClick={generateSecret}
          >
            Generate 2FA Secret
          </button>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-xl">
            {qrCode && (
              <img src={qrCode} alt="2FA QR Code" className="w-32 h-32" />
            )}
          </div>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter 2FA Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900"
          />
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition"
            onClick={enable2FA}
          >
            Confirm Code
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Enable Two-Factor Authentication (2FA)</h1>
    //   {!qrCode ? (
    //     <button onClick={generateSecret}>Generate 2FA Secret</button>
    //   ) : (
    //     <div>
    //       <img src={qrCode} alt="2FA QR Code" />
    //       <div>
    //         <input
    //           type="text"
    //           value={code}
    //           onChange={(e) => setCode(e.target.value)}
    //           placeholder="Enter 2FA code"
    //         />
    //         <button onClick={enable2FA}>Enable 2FA</button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
