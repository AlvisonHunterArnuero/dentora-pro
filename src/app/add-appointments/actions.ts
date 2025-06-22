"use server";

import { createAppointment } from "@/app/services/appointments.service";

export interface AppointmentPayload {
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
  user: string;
}

export async function createAppointmentServer(payload: AppointmentPayload) {
  return await createAppointment(payload);
}
