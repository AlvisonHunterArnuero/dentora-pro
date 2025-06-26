'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { SignInFormProps, SignInFormValues } from './Forms.types';
import { SignInSchema } from './ValidationSchemas';
import { Box, Button } from '@mui/material';
import { CustomTextField } from './CustomTextField';

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isSubmitting }) => {
  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form className="w-screen max-w-lg p-4 min-h-96">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 3,
          }}
        >
          <CustomTextField name="email" label="Email" />
          <CustomTextField
            name="password"
            label="Enter Password"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              py: 2,
              mt: 2,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default SignInForm;