"use client";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import {
  Box,
  Tooltip,
  Stack,
  Typography,
  ButtonGroup,
  Button,
  TableFooter,
  TablePagination,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import Container from "@mui/material/Container";
import Sheet from "@mui/joy/Sheet";
import Delete from "@mui/icons-material/Delete";
import {
  fetchAppointments,
  deleteAppointment,
} from "../services/appointments.service";
import {
  Appointment,
  AppointmentsListProps,
} from "../models/appointments.model";
import { formatDateRange, getAppointmentStatus } from "../utils/dateHelpers";
import { EditCalendar } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function AppointmentsList({ appointmentsList }: AppointmentsListProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [appointments, setAppointments] =
    useState<Appointment[]>(appointmentsList);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - appointmentsList.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  async function removeAppointment(appointmentId: string) {
    if (!appointmentId) return;

    try {
      await deleteAppointment(appointmentId);
      const updatedAppointmentsFetched = await fetchAppointments();
      const updatedAppointments = updatedAppointmentsFetched.appointments || [];
      setAppointments(updatedAppointments);

      setSnackbarMessage("The item has been deleted");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(`${error} - The item could not be deleted`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleOpenModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = (appointmentId: string) => {
    removeAppointment(appointmentId);
    setOpenModal(false);
  };

  const headers = [
    "Patinet",
    "Title",
    "Description",
    "Date",
    "Status",
    "Actions",
  ];
  return (
    <Container className="flex flex-col items-center   justify-center py-4 ">
      <Box>
        <Sheet sx={{ height: 450, overflow: "auto" }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="table with sticky header"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <StyledTableCell
                    key={header}
                    align={index === headers.length - 1 ? "center" : "left"}
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? appointments.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : appointments
              ).map(({ id, title, description, startTime, endTime, user }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="appointment">
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : "No data"}
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>
                    {(() => {
                      const { datePart, time } = formatDateRange(
                        startTime,
                        endTime
                      );
                      return (
                        <>
                          <div>{datePart}</div>
                          <div>{time}</div>
                        </>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const { label, color, Icon } =
                        getAppointmentStatus(startTime);
                      return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon color={color} fontSize="small" />
                          <Typography color={color} fontSize="0.9rem">
                            {label}
                          </Typography>
                        </Stack>
                      );
                    })()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack spacing={2}>
                      <ButtonGroup
                        variant="text"
                        aria-label="Appointment actions"
                      >
                        <Snackbar
                          message="Not implemented"
                          open={open}
                          autoHideDuration={2000}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        />
                        <Tooltip title="Edit Appointment">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => {
                              router.push("/appointments/" + id);
                            }}
                          >
                            <EditCalendar sx={{ color: "green" }} />
                          </button>
                                
                        </Tooltip>

                        <Tooltip title="Delete Appointment">
                          <Button
                            onClick={() =>
                              handleOpenModal({
                                id,
                                title,
                                description,
                                startTime,
                                endTime,
                              })
                            }
                            color="error"
                          >
                            <Delete />
                          </Button>
                        </Tooltip>
                      </ButtonGroup>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={appointments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>

        </Sheet>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the {selectedAppointment?.title}{" "}
            appointment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedAppointment) {
                handleConfirm(selectedAppointment.id);
              }
            }}
            color="error"
            variant="contained"
          >
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={snackbarMessage}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AppointmentsList;
