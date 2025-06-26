import AppointmentsList from './AppointmentsList';
import NavBar from './NavBar';
import Container from '@mui/material/Container';
import { cookies } from 'next/headers';

export default async function AppointmentsPage() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt_token')?.value;
  let appointments = [];
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointment`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': jwtToken || ''
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch appointments: ${response.statusText}`);
    }

    const data = await response.json();
    appointments = data.appointments;
  } catch (error: any) {
    console.error('Appointments fetch error:', error.message);
  }

  return (
    <>
      <NavBar />
      <Container className="flex flex-col items-center justify-center mt-15 py-4">
        <h2 className="text-2xl font-bold mb-4">Dentora Pro Appointments</h2>
        <p className="text-gray-600 mb-8">
          Here are your upcoming appointments. Click on an appointment to view
          more details or to edit it.
        </p>
        <AppointmentsList appointments={appointments} />
      </Container>
    </>
  );
}