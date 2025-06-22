"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchUsers() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt_token")?.value;
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        "x-access-token": jwtToken || "",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getEmailFromToken() {
  const cookieStore = cookies();
  const jwtToken = (await cookieStore).get("jwt_token")?.value;

  if (!jwtToken) {
    throw new Error("No token found");
  }

  const decoded = jwt.decode(jwtToken) as { name?: string; email?: string };

  const email = decoded?.email || decoded?.name;

  if (!email) {
    throw new Error("Email not found in token");
  }

  return email;
}

export async function getUserInformation() {
  try {
    const email = await getEmailFromToken();

    if (!email) {
      throw new Error("No email found in token");
    }

    const usersFetched = await fetchUsers();
    const users = usersFetched.allUsers || [];

    const user = users.find((user: { email: string }) => user.email === email);

    if (!user) {
      throw new Error(`User not found for email: ${email}`);
    }

    return {
      fullName: user.firstName + " " + user.lastName || "Nombre no disponible",
      email: user.email,
      role: user.role === "user" ? "Patient" : "Doctor",
      id: user._id,
    };
  } catch (error) {
    console.error("Error getting user information:", error);
    return null;
  }
}
