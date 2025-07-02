import type { Meta, StoryObj } from '@storybook/react';
import FormEditAppointment from './FormEditAppointment';
import { Appointment } from '@/app/models/appointments.model';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/jest';

const meta: Meta<typeof FormEditAppointment> = {
  title: 'Components/Forms/FormEditAppointment',
  component: FormEditAppointment,
  tags: ['autodocs'],
  argTypes: {
    appointment: {
      control: 'object',
      description: 'Appointment data to edit',
    },
    user: {
      control: 'object',
      description: 'User associated with the appointment',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormEditAppointment>;

const mockUser = {
  id: 'user1',
  _id: 'user1',
  name: 'Alvison Hunter',
  firstName: 'Alvison',
  lastName: 'Hunter',
  email: 'alvison@example.com',
  role: 'Patient' as const,
};

const mockAppointment: Appointment = {
  id: '1',
  title: 'Dental Cleaning',
  description: 'Regular dental cleaning and checkup',
  startTime: new Date('2023-12-15T10:00:00'),
  endTime: new Date('2023-12-15T11:00:00'),
  status: 'pending',
  observations: 'Patient has sensitive gums',
  user: mockUser.id,
};
export const Default: Story = {
  args: {
    appointment: mockAppointment,
    user: mockUser,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('combobox', { name: 'Select your title' })
    ).toHaveValue('Dental Cleaning');
    await expect(
      canvas.getByLabelText('Select the date')
    ).toHaveValue('2023-12-15');
    await expect(
      canvas.getByLabelText('Enter your Start Time:')
    ).toHaveValue('10:00');
    await expect(
      canvas.getByLabelText('Enter your End Time:')
    ).toHaveValue('11:00');
    await expect(
      canvas.getByRole('textbox', { name: 'Enter your description' })
    ).toHaveValue('Regular dental cleaning and checkup');

    await expect(
      canvas.getByRole('textbox', { name: 'Enter your observations' })
    ).toHaveValue('Patient has sensitive gums');

    await expect(
      canvas.getByText('Editing Appointment of Alvison Hunter')
    ).toBeInTheDocument();
  },
};

export const WithValidationErrors: Story = {
  args: {
    appointment: {
      ...mockAppointment,
      title: '',
      status: '',
      description: '',
      startTime: new Date('2023-12-15T12:00:00'),
      endTime: new Date('2023-12-15T11:00:00'),
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('The title is required')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('The status is required')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Please enter a description')
    ).toBeInTheDocument();
  },
};

export const WithoutUser: Story = {
  args: {
    appointment: {
      ...mockAppointment,
      user: '',
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('Editing Appointment')
    ).toBeInTheDocument();
  },
};

export const FormSubmission: Story = {
  args: {
    appointment: mockAppointment,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    userEvent.clear(
      canvas.getByRole('combobox', { name: 'Select your title' })
    );
    await userEvent.click(
      canvas.getByRole('combobox', { name: 'Select your title' })
    );

    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{Enter}');

    await expect(
      canvas.getByRole('combobox', { name: 'Select your title' })
    ).toHaveValue('Consultation for Braces');

    await new Promise((resolve) => setTimeout(resolve, 500));

    userEvent.clear(
      canvas.getByRole('combobox', { name: 'Select the status' })
    );
    await userEvent.click(
      canvas.getByRole('combobox', { name: 'Select the status' })
    );

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await new Promise((resolve) => setTimeout(resolve, 500));

    await userEvent.clear(
      canvas.getByRole('textbox', { name: 'Enter your description' })
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Enter your description' }),
      'We need to discuss the braces options and costs.',
      { delay: 10 }
    );

    await userEvent.clear(
      canvas.getByRole('textbox', { name: 'Enter your observations' })
    );
    await userEvent.type(
      canvas.getByRole('textbox', {
        name: 'Enter your observations',
      }),
      'This person has a history of dental issues. He needs to be monitored closely.',
      { delay: 10 }
    );

    await expect(
      canvas.getByRole('button', { name: 'SUBMIT' })
    ).toBeEnabled();
  },
};