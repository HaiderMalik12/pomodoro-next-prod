import Enable2FA from "@/components/auth/Enable2FA";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader.includes("access_token=")) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    headers: {
      Cookie: cookieHeader,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/login");
  }
  return <Enable2FA />;
}
