import type { Meta, StoryObj } from "@storybook/react";

import AppointmentsList from "./AppointmentsList";
// import { fetchAppointments } from "../services/appointments";

const meta = {
  component: AppointmentsList,
} satisfies Meta<typeof AppointmentsList>;

export default meta;

type Story = StoryObj<typeof meta>;
// const appointments = await fetchAppointments();
export const Default: Story = {
  args: {
    appointmentsList: [],
  },
};
