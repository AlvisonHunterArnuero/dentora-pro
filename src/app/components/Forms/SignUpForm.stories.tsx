import type { Meta, StoryObj } from '@storybook/react';
import SignUpForm from './SignUpForm';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import { fn } from '@storybook/test';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Forms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sign-up form with multiple fields using MUI and Formik.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};
export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/First Name/i),
      'Alvison',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Last Name/i),
      'Hunter Arnuero',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Address/i),
      '25 de julio',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Phone Number/i),
      '2345 9870',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'alvison.hunter@codecrafterslabs.com',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Enter Password/i),
      'securePassword123!',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Confirm Password/i),
      'securePassword123!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign Up/i })
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
      canvas.getByRole('button', { name: /sign up/i })
    );

    await waitFor(() => {
      expect(
        canvas.getByText('Name is Required')
      ).toBeInTheDocument();

      expect(
        canvas.getByText('Last name is Required')
      ).toBeInTheDocument();

      expect(
        canvas.getByText('Address is Required')
      ).toBeInTheDocument();

      expect(
        canvas.getByText('Phone Numer is Required')
      ).toBeInTheDocument();

      expect(
        canvas.getByText('Email is Required')
      ).toBeInTheDocument();
      expect(
        canvas.getByText('Password is Required')
      ).toBeInTheDocument();

      expect(
        canvas.getByText('Confirm Password is Required')
      ).toBeInTheDocument();
    });
  },
};

export const InvalidEmailFormat: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/First Name/i),
      'Alvison',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Last Name/i),
      'Hunter Arnuero',
      { delay: 10 }
    ); 

     await userEvent.type(
      canvas.getByLabelText(/Address/i),
      'wrong addresss',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Phone Number/i),
      '90873465',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'an-invalid-email',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Enter Password/i),
      'securePassword123!',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Confirm Password/i),
      'securePassword123!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign Up/i })
    );

    await waitFor(() => {
      expect(canvas.getByText('Invalid email')).toBeInTheDocument();
    });
  },
};

export const PasswordsMismatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/First Name/i),
      'Declan Jaleel',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Last Name/i),
      'Hunter Acevedo',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'daeglanjhunter@gmail.com',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Enter Password/i),
      'securePassword456!',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Confirm Password/i),
      'secPwd123!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign Up/i })
    );

    await waitFor(() => {
      expect(
        canvas.getByText('Passwords must match')
      ).toBeInTheDocument();
    });
  },
};
