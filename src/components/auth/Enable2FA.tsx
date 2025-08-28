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
    <div>
      <h1>Enable Two-Factor Authentication (2FA)</h1>
      {!qrCode ? (
        <button onClick={generateSecret}>Generate 2FA Secret</button>
      ) : (
        <div>
          <img src={qrCode} alt="2FA QR Code" />
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 2FA code"
            />
            <button onClick={enable2FA}>Enable 2FA</button>
          </div>
        </div>
      )}
    </div>
  );
}
