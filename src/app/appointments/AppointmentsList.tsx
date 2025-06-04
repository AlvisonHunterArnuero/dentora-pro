"use client";
import * as React from "react";
import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
  } from "@mui/material";
  import Sheet from "@mui/joy/Sheet";
  import { Delete, EditCalendar } from "@mui/icons-material";

function DateNewFormat(
  dateString1: string | Date,
  dateString2: string | Date
): string {
  let firstDate: Date;
  if (typeof dateString1 === "string") {
    firstDate = new Date(Date.parse(dateString1));
  } else {
    firstDate = dateString1;
  }

  let secondDate: Date;

  if (typeof dateString2 === "string") {
    secondDate = new Date(Date.parse(dateString2));
  } else {
    secondDate = dateString2;
  }

  const result =
    firstDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " " +
    firstDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " to " +
    secondDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return result;
}

interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

function AppointmentsList({ appointments }: AppointmentsListProps) {
  async function removeAppointment(appointmentId: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          // body: JSON.stringify({
          //   appointmentId,
          // }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response;
      if (!result.ok) {
        console.error("Failed to delete appointment:", result.statusText);
        return;
      }

      const updatedAppointments = await result.json();
      console.log("Updated Appointments:", updatedAppointments);
      // setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }

  return (
    <Container className="flex flex-col items-center   justify-center py-4 ">
      <Box>
        <Sheet sx={{ height: 350, overflow: "auto" }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="table with sticky header"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Title </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="appointment">
                    {appointment.title}
                  </TableCell>

                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>
                    {DateNewFormat(appointment.startTime, appointment.endTime)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Appointment">
                      <button className="text-blue-500 hover:underline">
                        <EditCalendar sx={{ color: "green" }} />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete Appointment">
                      <button
                        className="text-red-500 hover:underline ml-4"
                        onClick={(e) => {
                          e.preventDefault();
                          removeAppointment(appointment.id);
                        }}
                      >
                        <Delete />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Sheet>
      </Box>
    </Container>
  );
}

export default AppointmentsList;
