import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { fn } from '@storybook/test';
import FormsWrapper from './FormsWrapper';

const meta: Meta<typeof FormsWrapper> = {
  title: 'Components/Forms/FormsWrapper',
  component: FormsWrapper,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper component that contains both SignIn and SignUp forms with tab switching.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormsWrapper>;

export const Default: Story = {};

export const SelectSignUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signUpTab = canvas.getByTestId('sign-up-tab');
    await userEvent.click(signUpTab);

    await userEvent.type(
      canvas.getByLabelText(/First Name/i),
      'Alvison',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Last Name/i),
      'Hunter',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'al.hunter@ethicalhackers.dev',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Enter Password/i),
      'securePassword456!',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/Confirm Password/i),
      'securePassword456!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign Up/i })
    );
  },
};

export const SelectLogon: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logonTab = canvas.getByTestId('sign-in-tab');
    await userEvent.click(logonTab);

    await userEvent.type(
      canvas.getByLabelText(/Email/i),
      'al.hunter@ethicalhackers.dev',
      { delay: 10 }
    );

    await userEvent.type(
      canvas.getByLabelText(/password/i),
      'securePassword456!',
      { delay: 10 }
    );

    await userEvent.click(
      canvas.getByRole('button', { name: /Sign in/i })
    );
  },
};