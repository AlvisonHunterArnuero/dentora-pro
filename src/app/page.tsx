import Image from 'next/image';
import React from 'react';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Container
} from '@mui/material';
import FormsWrapper from './components/Forms/FormsWrapper';

export default function Home() {
  return (
    <Container className="flex flex-col items-center h-screen justify-center min-h-screen border-2">
      <Stack
        display={'flex'}
        direction={'row'}
        className="items-center justify-between w-screen max-w-screen-xl"
      >
        <Box className="relative hidden h-full w-0 sm:w-[30%] md:w-[50%] lg:w-screen md:flex items-center justify-center transition-all duration-500 ease-in-out overflow-hidden">
          <Image
            aria-hidden
            src="/dentora-pro-login-screen.png"
            alt="Dentora Pro Logon Screen"
            priority
            fill
            className="transition-all duration-500 ease-in-out object-cover lg:opacity-100 md:opacity-50 sm:opacity-30 opacity-0 lg:translate-x-0 md:translate-x-[-50%] sm:translate-x-[-100%]"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </Box>
        <Stack
          display={'flex'}
          direction={'column'}
          spacing={1}
          justifyContent={'center'}
          alignItems={'center'}
          className="h-screen w-full flex items-center justify-center"
          sx={{
            backgroundImage: {
              sm: 'url(/dentora-pro-login-screen-02.png)',
              md: 'none'
            },
            backgroundColor: {
              sm: 'transparent',
              md: 'white'
            },
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <FormsWrapper />
        </Stack>
      </Stack>
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, backgroundColor: '#363636' }}
        color="primary"
      >
        <Toolbar>
          <Typography
            variant="body2"
            style={{
              display: 'flex',
              textAlign: 'center',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontFamily: 'var(--font-inter-ui)',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#fff'
            }}
          >
            Copyright © {new Date().getFullYear()} Dentora Pro. Proudly created
            by
            <a
              className="pl- flex items-center gap-2 hover:text-[#3CA687] hover:underline hover:underline-offset-4"
              href="https://codecrafterslabs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              codecrafterslabs.com
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
