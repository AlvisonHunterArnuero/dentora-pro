import AppointmentsList from './AppointmentsList';
import NavBar from './NavBar';
import Container from '@mui/material/Container';
import { fetchServerAPI } from '@/actions/api.server';

interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export default async function AppointmentsPage() {
  let appointments: Appointment[] = [];

  try {
    const data = await fetchServerAPI<{ appointments: Appointment[] }>(
      '/appointment',
      'GET'
    );
    appointments = data.appointments || [];
  } catch (error) {
    console.error('Appointments fetch error:', error instanceof Error ? error.message : 'Unknown error');
  }
  console.log(appointments)

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