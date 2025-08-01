"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";
import React from "react";
import { registerUser } from "@/lib/api";
import FormError from "../ui/FormError";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterForm() {
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

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setServerError("");
    console.log("Form submitted:", data);
    try {
      console.log("Creating account with data:", data);
      const response = await registerUser(data);
      if (!response.token) {
        const error = await response.json();
        setServerError(error.message || "Failed to create account");
      } else {
        //navigate to the dashboard or home page
        console.log("Account created successfully:", response);
        router.push("/login");
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
      <h2 className="text-2xl font-bold mb-4">Create your Account</h2>

      {serverError && <FormError message={serverError} />}
      <Input
        label="First Name"
        type="text"
        {...register("firstName")}
        error={errors.firstName?.message}
        id="firstName"
      />

      <Input
        label="Last Name"
        type="text"
        {...register("lastName")}
        error={errors.lastName?.message}
        id="lastName"
      />

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

      <Input
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        id="confirmPassword"
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Register"}
      </Button>
    </form>
  );
}
