const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/appointment";

export async function fetchAppointments() {
  try {
    const response = await fetch(`${BASE_URL}/appointment`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODU1N2U3NDU0MzkyYzVlMGFmZTY2ZjIiLCJuYW1lIjoianVhbml0by5sb3BlekBleGFtcGxlLmNvbSIsImlhdCI6MTc1MDQzMzM5NiwiZXhwIjoxNzUwNDQwNTk2fQ.xwRzDxjeAixTT5Q8TWCTPkNt_ELsrFnCDEiKqQlCZW8",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAppointment(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODUzOWJhZGMzMGYxNmJjZDZjMjQzY2MiLCJuYW1lIjoiZWx2aXMuZ29tZXouZkBob3RtYWlsLmNvbSIsImlhdCI6MTc1MDMxMDMyMSwiZXhwIjoxNzUwMzE3NTIxfQ.EzAiRAxnc6iQFa4PRuwHMM-3vouQxJ6x24SQp2qkXjI",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Deleting appointment failed");
  }
}
export async function createAppointment(appointment: {
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "fail to create appointment");
  }
  return response.json();
}
