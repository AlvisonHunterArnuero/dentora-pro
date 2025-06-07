"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchAPI } from "@/utils/api";
import { SignInFormValues } from "../components/Forms/Forms.types";

export async function loginAction({ email, password }: SignInFormValues) {
  let response;

  try {
    response = await fetchAPI("/auth/signin", "POST", { email, password });
  } catch (error) {
    console.error("Login failed:", error);
    return redirect("/?error=login_failed");
  }

  if (!response) {
    return redirect("/?error=no_response");
  }

  const cookie = await cookies();
  cookie.set("jwt_token", response.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
    sameSite: "lax",
  });

  return redirect("/appointments");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt_token");
  redirect("/");
}
