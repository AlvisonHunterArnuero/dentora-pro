export interface Appointment {
  _id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}

export interface AppointmentsListProps {
  appointmentsList: Appointment[];
}

export type AppointmentStatus = {
  label: string;
  color: "error" | "warning" | "success";
  Icon: React.ElementType;
};
