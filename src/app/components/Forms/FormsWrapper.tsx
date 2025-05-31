'use client';
import React, { useEffect, useState } from 'react';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useAuth } from '../../auth/context';
import FormsTab from './FormsTab';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import type { SignInFormValues, SignUpFormValues } from './Forms.types';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/login/server-actions';

const FormsWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/appointments');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSignIn = async (values: SignInFormValues) => {
    setError(null);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    try {
      await loginAction(formData);

      router.replace('/appointments');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = (values: SignUpFormValues) => {
    console.log('Sign Up:', values);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '2em'
        }}
      >
        Checking...
      </div>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        p: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 'auto',
            width: '100%',
            maxWidth: '450px',
            gap: 2,
            mb: 4
          }}
        >
          <Paper sx={{ padding: 0.5 }} elevation={1}>
            <HealthAndSafetyIcon
              sx={{
                fontSize: '2rem',
                color: 'primary.main'
              }}
            />
          </Paper>
          <Typography
            className="text-5xl font-bold text-sky-500 text-center"
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '2rem' },
              color: 'primary.main',
              fontFamily: 'var(--font-inter)'
            }}
          >
            Dentora Pro
          </Typography>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <FormsTab
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          {activeTab === 0 ? (
            <SignInForm onSubmit={handleSignIn} isSubmitting={false} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} />
          )}
        </FormsTab>
      </Box>
    </Box>
  );
};

export default FormsWrapper;
