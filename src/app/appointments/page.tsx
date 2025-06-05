'use client';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useAuth } from '../auth/context';

export default function AppointmentsPage() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <Box
      sx={{
        pt: 6,
        textAlign: 'center',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <Typography variant="h2" gutterBottom>
        Appointments Page
      </Typography>
      <Box sx={{ mt: 4, position: 'relative', width: '100%', height: 300 }}>
        <Image
          src="/site-under-construction.png"
          alt="Under construction sign with traffic cones and a hard hat."
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Please check back later.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 4, py: 1.5, px: 4 }}
      >
        Log Out
      </Button>
    </Box>
  );
}
