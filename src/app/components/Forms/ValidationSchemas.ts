import { match } from 'assert';
import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ\s']+$/,'It must contain just letters')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is Required'),
  lastName: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ\s']+$/,'It must contain just letters')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is Required'),
  address: Yup.string()
    .min(5, 'Address too short')
    .max(100, 'Address too long'),
  phone: Yup.string()
    .matches( /^(\+?\d{1,3}[-.\s]?|\()?(\d{1,4})\)?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/,
       'Invalid phone number'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Password is Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password '),
});