"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            credentials: "include",
          }
        );

        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      }
    };

    checkLogin();
  }, [setLoggedIn]);

  return <> {children} </>;
}
