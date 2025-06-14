const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/appointments";

export async function fetchAppointments() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Error to get appointments");
  return response.json();
}

export async function deleteAppointment(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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
