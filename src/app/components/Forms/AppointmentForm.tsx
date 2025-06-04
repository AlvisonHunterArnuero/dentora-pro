"use client";

import { TextField, Button, Box, Grid } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "./AppointmentSchema";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  description?: string;
}

const AppointmentForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      date: data.date.toISOString(),
      startTime: data.startTime.toISOString(),
      endTime: data.endTime.toISOString(),
    };

    try {
      const res = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Appointment created!");
        router.push("/appointments");
      } else {
        const error = await res.json();
        alert(error.message || "Error creating appointment");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the appointment.");
    }
  };

  return (
    <Box className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Enter your title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Select the date"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toDate())}
                />
              )}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Enter your Start Time"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toDate())}
                />
              )}
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm">{errors.startTime.message}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Enter your End Time"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toDate())}
                />
              )}
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime.message}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Enter your description"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} className="flex justify-between">
            <Button
              variant="outlined"
              onClick={() => router.back()}
              color="secondary"
            >
              Go Back
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AppointmentForm;
