"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";
import React from "react";
import { loginUser, registerUser } from "@/lib/api";
import FormError from "../ui/FormError";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState("");
  const router = useRouter();
  const { setLoggedIn } = useAuthStore();

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setServerError("");
    console.log("Form submitted:", data);
    try {
      console.log("account login with data:", data);
      const response = await loginUser(data);
      if (!response.message) {
        const error = await response.json();
        setServerError(error.message || "Failed to create account");
      } else {
        setLoggedIn(true); // Update the auth store state
        //navigate to the dashboard or home page
        console.log("Account loggedIn successfully:", response);
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError(
        "An error occurred while creating your account. try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {serverError && <FormError message={serverError} />}

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        id="email"
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        id="password"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Login Account..." : "Login"}
      </Button>
    </form>
  );
}
