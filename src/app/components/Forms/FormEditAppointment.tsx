"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Alert, Snackbar } from "@mui/material";
import {
  EditAppointment,
  fetchAppointments,
} from "../../services/appointments.service";
import { Appointment } from "@/app/models/appointments.model";

interface AppointmentProp {
  appointment: Appointment;
}

function FormEditAppointment({ appointment }: AppointmentProp) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorStartTime, setErrorStartTime] = useState("");
  const [errorEndTime, setErrorEndTime] = useState("");
  const [statusSubmit, setStatusSubmit] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showMessage = (alertMessage: string) => {
    setMessage(alertMessage);
    setOpen(true);
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const start = new Date(appointment.startTime);
    const end = new Date(appointment.endTime);

    setForm({
      title: appointment.title || "",
      description: appointment.description || "",
      date: start.toISOString().split("T")[0],
      startTime: start.toTimeString().slice(0, 5),
      endTime: end.toTimeString().slice(0, 5),
    });
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  const validateDate = (value: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (value < today) {
      setError("You cannot set a date before today");
      setStatusSubmit(true);
    } else {
      setError("");
      setStatusSubmit(false);
    }
  };

  const validateTime = async (field: string, value: string) => {
    const lunchStart = "12:00";
    const lunchEnd = "13:00";
    const minTime = "08:00";
    const maxTime = "17:00";
    const msg = "You cannot set this time for";


    if (field === "startTime") {
      if (
        value < minTime ||
        value > maxTime ||
        (value >= lunchStart && value <= lunchEnd)
      ) {
        setErrorStartTime(`${msg} ${field}`);
        setStatusSubmit(true);
      } else {
        if (form.endTime && value > form.endTime) {
          setErrorStartTime("The start time cannot be greater than end time");
          setStatusSubmit(true);
        } else {
          setErrorStartTime("");
          setStatusSubmit(false);
          const appointmentsFetched = await fetchAppointments();
          const appointments = appointmentsFetched.appointments || [];
          const appointmentFinded = appointments.find(
            (a: Appointment) =>
              new Date(a.startTime).toISOString().split("T")[0] == form.date &&
              new Date(a.startTime).toTimeString().slice(0, 5) == value
          );
          if (appointmentFinded) {
            showMessage(
              "An appointment already exists on the selected date and time"
            );
            setSeverity("warning");
            setStatusSubmit(true);
          } else {
            setStatusSubmit(false);
          }
        }
      }
    }

    if (field === "endTime") {
      if (
        value < minTime ||
        value > maxTime ||
        (value >= lunchStart && value <= lunchEnd)
      ) {
        setErrorEndTime(`${msg} ${field}`);
        setStatusSubmit(true);
      } else {
        if (form.startTime && value < form.startTime) {
          setErrorEndTime("The end time cannot be less than start time");
          setStatusSubmit(true);
        } else {
          setErrorEndTime("");
          setErrorStartTime("");
          setStatusSubmit(false);
        }
      }
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (field === "date") {
        validateDate(value);
      }

      if (field === "startTime" || field === "endTime") {
        validateTime(field, value);
      }

      setForm({ ...form, [field]: e.target.value });
    };

  const handleUpdate = async () => {
    const { title, description, date, startTime, endTime } = form;
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const IdAppointment = appointment.id;

    appointment = {
      id: IdAppointment,
      title,
      description,
      startTime: start,
      endTime: end,
    };

    const res = await EditAppointment(appointment.id, appointment);

    if (res.ok) {
      showMessage("The appointment has been updated successfully");
      setSeverity("success");
      router.push("/appointments");
    } else {
      showMessage("The appointmet was not updated");
      setSeverity("error");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        pb: 5,
        border: "solid 1px gray",
        borderRadius: 2,
        bgcolor: "#ffffee",
        color: "primary",

      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            sx={{ textAlign: "center", pt: 4 }}
          >
            {appointment.user
              ? "Editing Appointment of " +
                appointment.user?.firstName +
                " " +
                appointment.user?.lastName
              : "Editing Appointment"}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} m={5}>
            <TextField
              fullWidth
              required
              id="title"
              label="Enter your title!"
              value={form.title}
              onChange={handleChange("title")}
              error={form.title.trim() === ""}
              helperText={
                form.title.trim() === "" ? "The title is required" : ""
              }
            />
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <TextField
                fullWidth
                id="date"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                label="Select the date"
                error={!!error}
                helperText={error || " "}
              />
            </Grid>
          </Box>

          <Box display="flex" justifyContent="center" gap={2} m={5}>
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <Typography
                color="primary"
                gutterBottom
                sx={{ textAlign: "left" }}
              >
                Enter your Start Time:
              </Typography>
              <TextField
                fullWidth
                type="time"
                id="starttime"
                value={form.startTime}
                onChange={handleChange("startTime")}
                error={!!errorStartTime}
                helperText={errorStartTime || " "}
              />
            </Grid>
            <Grid display="flex" flexDirection={"column"} sx={{ width: "50%" }}>
              <Typography
                color="primary"
                gutterBottom
                sx={{ textAlign: "left" }}
              >
                Enter your End Time:
              </Typography>
              <TextField
                fullWidth
                type="time"
                id="endtime"
                value={form.endTime}
                onChange={handleChange("endTime")}
                error={!!errorEndTime}
                helperText={errorEndTime || " "}
              />
            </Grid>
          </Box>
          <Box m={5}>
            <TextField
              fullWidth
              required
              label="Enter your description!"
              id="description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange("description")}
              error={form.description.trim() === ""}
              helperText={
                form.description.trim() === ""
                  ? "Please enter a description"
                  : ""
              }
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              sx={{ marginLeft: "50px" }}
              endIcon={<ReplyOutlinedIcon />}
              variant="contained"
              onClick={() => {
                router.push("/appointments");
              }}
            >
              GO BACK
            </Button>
            <Button
              type="submit"
              sx={{ marginRight: "50px" }}
              endIcon={<SendIcon />}
              variant="contained"
              disabled={statusSubmit}
            >
              SUBMIT
            </Button>

            <Snackbar
              sx={{ width: "100%" }}
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert variant="filled" severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          </Box>
        </form>
      </>
    </Box>
  );
}

export default FormEditAppointment;
