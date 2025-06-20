'use client';
import * as React from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import { DeleteOutline, Edit as EditCalendar } from '@mui/icons-material';
import { useApi } from '@/_hooks/useApi';

interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: string | Date;
  endTime: string | Date;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

function DateNewFormat(dateString1: string | Date, dateString2: string | Date): string {
  let firstDate: Date;
  if (typeof dateString1 === 'string') {
    firstDate = new Date(Date.parse(dateString1));
  } else {
    firstDate = dateString1;
  }

  let secondDate: Date;
  if (typeof dateString2 === 'string') {
    secondDate = new Date(Date.parse(dateString2));
  } else {
    secondDate = dateString2;
  }

  const result =
    firstDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) +
    ' ' +
    firstDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }) +
    ' to ' +
    secondDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return result;
}

export default function AppointmentsList({ appointments }: AppointmentsListProps) {
  const { fetchWithAuth, data, error, loading } = useApi<{ success: boolean }>();
  const [localAppointments, setLocalAppointments] = React.useState<Appointment[]>(appointments);

  // Update localAppointments when prop changes (e.g., page refresh)
  React.useEffect(() => {
    setLocalAppointments(appointments);
  }, [appointments]);

  const handleRemoveAppointment = async (appointmentId: string) => {
    try {
      // Use fetchWithAuth to delete appointment via API route
      await fetchWithAuth(`/api/appointments/${appointmentId}`, 'DELETE');
      // Optimistically update local state
      setLocalAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center py-4">
      <Box>
        <Sheet sx={{ height: 350, overflow: 'auto' }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="table with sticky header"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {appointment.title}
                  </TableCell>
                  <TableCell>{appointment.description || 'N/A'}</TableCell>
                  <TableCell>
                    {DateNewFormat(appointment.startTime, appointment.endTime)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Appointment">
                      <button className="text-blue-500 hover:underline">
                        <EditCalendar sx={{ color: 'green' }} />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete Appointment">
                      <button
                        className="text-red-500 hover:underline ml-4"
                        onClick={() => handleRemoveAppointment(appointment.id)}
                        disabled={loading}
                      >
                        <DeleteOutline />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Sheet>
        {error && (
          <Box sx={{ mt: 2, color: 'red' }}>
            Error deleting appointment: {error}
          </Box>
        )}
      </Box>
    </Container>
  );
}