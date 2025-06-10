import * as yup from "yup";
import { Dayjs } from "dayjs";

export const appointmentSchema: yup.ObjectSchema<{
  title: string;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  description?: string;
}> = yup.object({
  title: yup.string().required("Title is required"),
  date: yup
    .mixed<Dayjs>()
    .required("Date is required")
    .test("is-dayjs", "Invalid date", (value) => value && value.isValid()),

  startTime: yup
    .mixed<Dayjs>()
    .required("Start time is required")
    .test(
      "is-dayjs",
      "Invalid start time",
      (value) => value && value.isValid()
    ),

  endTime: yup
    .mixed<Dayjs>()
    .required("End time is required")
    .test("is-dayjs", "Invalid end time", (value) => value && value.isValid())
    .test(
      "is-after-start",
      "End time must be after start time",
      function (endTime) {
        const { startTime } = this.parent;
        return endTime && startTime && endTime.isAfter(startTime);
      }
    ),

  description: yup
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});
