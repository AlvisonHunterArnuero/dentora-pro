"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";
import { appointmentSchema } from "./AppointmentSchema";
import { useAuth } from "../auth/context";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface FormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  description: string;
}

const AppointmentForm = () => {
  const { token, isLoading: authLoading, isAuthenticated, user } = useAuth();

  // Verificar estado de autenticación
  if (authLoading) return <div>Loading authentication...</div>;
  if (!isAuthenticated || !token || !user) {
    return <div>Error: Authentication required. Please log in.</div>;
  }

  const router = useRouter();

  const formik = useFormik<FormData>({
    initialValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      user: user._id,
      description: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values) => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API URL is not defined");
        }
        const payload = {
          title: values.title,
          user: values.user,
          startTime: `${values.date}T${values.startTime}:00`,
          endTime: `${values.date}T${values.endTime}:00`,
          description: values.description,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error creating appointment");
        }

        alert("Appointment created successfully!");
        router.push("/appointments");
      } catch (err) {
        console.error("Submission error:", err);
        alert((err as Error).message || "Failed to create appointment");
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        pb: 5,
        borderRadius: 2,
        bgcolor: "#fff",
        color: "#000",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", pt: 4 }}>
        Please select from the below options:
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="center" gap={2} m={5}>
          <Box sx={{ width: "50%" }}>
            <TextField
              fullWidth
              required
              id="title"
              label="Enter your title!"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <TextField
              fullWidth
              required
              id="date"
              type="date"
              label="Select the date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        <Box m={5}>
          <FormControl fullWidth>
            <InputLabel id="user-label">Select User</InputLabel>
            <Select
              labelId="user-label"
              id="user"
              name="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user && Boolean(formik.errors.user)}
            >
              <MenuItem value={user._id}>
                {user.name} ({user.email})
              </MenuItem>
            </Select>
            {formik.touched.user && formik.errors.user && (
              <p className="text-red-500 text-sm">
                {HAPPENSformik.errors.user}
              </p>
            )}
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} m={5}>
          <Box sx={{ width: "50%" }}>
            <label htmlFor="startTime">Enter your Start Time:</label>
            <TextField
              type="time"
              fullWidth
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
              inputProps={{ step: 300 }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <label htmlFor="endTime">Enter your End Time:</label>
            <TextField
              type="time"
              fullWidth
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
              inputProps={{ step: 300 }}
            />
          </Box>
        </Box>

        <Box m={5}>
          <TextField
            fullWidth
            label="Enter your description!"
            id="description"
            multiline
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" m={5}>
          <Button
            sx={{ marginLeft: "50px" }}
            endIcon={<ReplyOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={() => router.push("/appointments")}
          >
            CANCEL
          </Button>
          <Button
            sx={{ marginRight: "50px" }}
            endIcon={<SendIcon />}
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Creating..." : "CREATE APPOINTMENT"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
