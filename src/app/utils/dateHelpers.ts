import { CheckCircle, WarningAmber, Cancel } from "@mui/icons-material";
import { AppointmentStatus } from "../models/appointments";

export function formatDateRange(
  start: string | Date,
  end: string | Date
): string {
  const firstDate = new Date(start);
  const secondDate = new Date(end);

  if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
    throw new Error("Invalid date(s) provided");
  }

  const datePart = firstDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const startTime = firstDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = secondDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} ${startTime} to ${endTime}`;
}

export function getAppointmentStatus(
  appointmentDate: string | Date
): AppointmentStatus {
  const now = new Date();
  const targetDate = new Date(appointmentDate);

  if (isNaN(targetDate.getTime())) {
    throw new Error("Invalid appointment date");
  }

  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const targetMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor(
    (targetMidnight.getTime() - nowMidnight.getTime()) / msPerDay
  );

  if (diffDays < 0) {
    return {
      label: "Overdue",
      color: "error",
      Icon: Cancel,
    };
  }

  if (diffDays <= 1) {
    return {
      label: "Almost Due",
      color: "warning",
      Icon: WarningAmber,
    };
  }

  return {
    label: "In Progress",
    color: "success",
    Icon: CheckCircle,
  };
}
