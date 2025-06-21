'use server';

import { SignUpFormValues } from '@/app/components/Forms/Forms.types';

export const signupAction = async (data: SignUpFormValues) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('An error occurred during signup:', error);
    throw error;
  }
};
