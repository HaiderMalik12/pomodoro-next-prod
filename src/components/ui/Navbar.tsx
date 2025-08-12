"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.loggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    // Check if user is logged in based on some condition, e.g., token presence
    const token = Cookies.get("access_token");
    console.log("Token from cookies:", token);
    setLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    // Clear the token and update the auth state
    Cookies.remove("access_token");
    setLoggedIn(false);
    await logoutUser();
    // Optionally redirect to the login page
    router.push("/login");
  };

  const AuthLinks = () => (
    <>
      <Link href="/dashboard" className="text-gray-700 hover:text-gray-600">
        Dashboard
      </Link>

      <Link href="/profile" className="text-gray-700 hover:text-gray-600">
        Profile
      </Link>

      <button
        onClick={handleLogout}
        className="text-gray-700 hover:text-gray-600 focus:outline-none"
      >
        Logout
      </button>
    </>
  );

  const GuestLinks = () => (
    <>
      <Link href="/login" className="text-gray-700 hover:text-gray-600">
        Login
      </Link>
      <Link href="/register" className="text-gray-700 hover:text-gray-600">
        Register
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          AI Pomodoro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-600">
            Home
          </Link>
          {isLoggedIn ? <AuthLinks /> : <GuestLinks />}
        </div>
        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 pb-4">
          <Link href="/" className="block text-gray-700 hover:text-gray-600">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="block text-gray-700 hover:text-gray-600"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block text-gray-700 hover:text-gray-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-gray-700 hover:text-gray-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block text-gray-700 hover:text-gray-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
