"use client";

import { useRouter } from "next/navigation";
import { Box, Grid, TextField, Button } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentSchema } from "./AppointmentSchema";
import dayjs, { Dayjs } from "dayjs";

interface FormData {
  title: string;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
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
      date: dayjs(),
      startTime: dayjs(),
      endTime: dayjs(),
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Error creating appointment");

      alert("Appointment created!");
      router.push("/appointments");
    } catch (err) {
      console.error(err);
      alert("Failed to create appointment.");
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
                  {...field}
                  label="Select the date"
                  value={field.value}
                  onChange={field.onChange}
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
                  {...field}
                  label="Start Time"
                  value={field.value}
                  onChange={field.onChange}
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
                  {...field}
                  label="End Time"
                  value={field.value}
                  onChange={field.onChange}
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
                  label="Description"
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
              color="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AppointmentForm;
