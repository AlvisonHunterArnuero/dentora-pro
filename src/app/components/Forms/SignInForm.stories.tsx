import type { Meta, StoryObj } from '@storybook/react';
import SignInForm from './SignInForm';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import { fn } from '@storybook/test';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Forms/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sign-in form with email and password fields using MUI and Formik.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {};

export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/email/i),
      'alvison.hunter@nicadevs.com',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/password/i),
      'securePassword123!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /sign in/i })
    );

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};

export const ShowsValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', { name: /sign in/i })
    );

    await waitFor(() => {
      expect(
        canvas.getByText('Email is required')
      ).toBeInTheDocument();
      expect(
        canvas.getByText('Password is required')
      ).toBeInTheDocument();
    });
  },
};

export const InvalidEmailFormat: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'invalid-email',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Password/i),
      'password',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign in/i })
    );

    await waitFor(() => {
      expect(canvas.getByText('Invalid email')).toBeInTheDocument();
    });
  },
};

export const PasswordTooShort: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'alvison.hunter@nicadevs.com',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Password/i),
      'short',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign in/i })
    );

    await waitFor(() => {
      expect(
        canvas.getByText(/password must be at least \d+ characters/i)
      ).toBeInTheDocument();
    });
  },
};