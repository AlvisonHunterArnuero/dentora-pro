"use server";
import { cookies } from "next/headers";
import { SignUpFormValues } from "@/app/components/Forms/Forms.types";

export const signupAction = async (data: SignUpFormValues) => {
  let response;

  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }

    const result = await response.json();

    const cookie = await cookies();
    cookie.set("jwt_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
      sameSite: "lax",
    });

    return "ok";
  } catch (error) {
    console.error("An error occurred during signup:", error);
    throw error;
  }
};