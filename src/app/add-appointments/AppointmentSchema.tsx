import * as yup from "yup";

interface AppointmentFormData {
  title: string;
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export const appointmentSchema: yup.ObjectSchema<AppointmentFormData> =
  yup.object({
    title: yup
      .string()
      .required("Title is required")
      .min(1, "Title cannot be empty"),
    user: yup
      .string()
      .required("User is required")
      .min(1, "User cannot be empty"),
    date: yup
      .string()
      .required("Date is required")
      .min(1, "Date cannot be empty"),
    startTime: yup
      .string()
      .required("Start time is required")
      .min(1, "Start time cannot be empty"),
    endTime: yup
      .string()
      .required("End time is required")
      .min(1, "End time cannot be empty")
      .test(
        "is-after-start",
        "End time must be after start time",
        function (endTime) {
          const { startTime, date } = this.parent;
          if (!endTime || !startTime || !date) return true;
          const startDateTime = new Date(`${date}T${startTime}:00`);
          const endDateTime = new Date(`${date}T${endTime}:00`);
          if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime()))
            return false;
          return endDateTime > startDateTime;
        }
      ),
    description: yup
      .string()
      .required("Description is required")
      .min(1, "Description cannot be empty")
      .max(500, "Description must be less than 500 characters"),
  });
