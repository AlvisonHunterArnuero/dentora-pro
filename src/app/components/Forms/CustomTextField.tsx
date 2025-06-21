'use client';
import React from 'react';
import {useField } from 'formik';
import { TextField } from '@mui/material';


export const CustomTextField: React.FC<{
  name: string;
  label: string;
  type?: string;
}> = ({ label, type = 'text', ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      type={type}
      label={label}
      fullWidth
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '& fieldset': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'primary.main',
        },
      }}
    />
  );
};