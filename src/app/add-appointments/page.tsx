"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { appointmentSchema } from "./AppointmentSchema";

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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODQzYzRlMDA2NmIzMGI4MzEwNjlhZjUiLCJuYW1lIjoicGVkcm8ucmFtaXJlekBleGFtcGxlLmNvbSIsImlhdCI6MTc0OTUzMDU2MCwiZXhwIjoxNzQ5NTM3NzYwfQ.4hY3KctPdrs50Z7XxcDJhPG-PmYODQzz3e1b_tb_NnE";
  if (!token) {
    return <div>Error: Authentication token is missing. Please log in.</div>;
  }

  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormData>({
    initialValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      user: "",
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
          startTime: ${values.date}T${values.startTime}:00,
          endTime: ${values.date}T${values.endTime}:00,
          description: values.description,
        };

        const res = await fetch(${process.env.NEXT_PUBLIC_API_URL}/appointments, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error creating appointment");
        }

        alert("Appointment created successfully!");
        router.push("/appointments");
      } catch (err) {
        console.error("Submission error:", err);
        alert(err.message || "Failed to create appointment.");
      }
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API URL is not defined");
        }
        const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}/user, {
          headers: { "x-access-token": token },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        const userList = data.allUsers.map((user: any) => ({
          _id: user._id,
          name: ${user.firstName} ${user.lastName},
          email: user.email,
        }));
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError((err as Error).message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Appointment Title"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="user-label">Select User</InputLabel>
              <Select
                labelId="user-label"
                label="Select User"
                id="user"
                name="user"
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.user && Boolean(formik.errors.user)}
                helperText={formik.touched.user && formik.errors.user}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Appointment Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="time"
              label="Start Time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startTime && Boolean(formik.errors.startTime)}
              helperText={formik.touched.startTime && formik.errors.startTime}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="time"
              label="End Time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12} className="flex justify-between">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/appointments")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Creating..." : "Create Appointment"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AppointmentForm;