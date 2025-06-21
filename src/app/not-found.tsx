import { Box, Container, Paper, Typography } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

function NotFound() {
  return (
    <Container className="flex flex-col items-center h-screen justify-center min-h-screen p-4 ">
      <Typography
        className="text-2xl font-bold text-gray-700 text-center my-4"
        variant="h3"
        component="h1"
        fontWeight={700}
        fontSize={"2rem"}
        fontFamily={"var(--font-inter)"}
      >
        Page Not Found
      </Typography>
      <Box className="flex items-center gap-2 py-4">
        <Paper sx={{ padding: 0.5 }} elevation={1}>
          <HealthAndSafetyIcon
            sx={{
              fontSize: "3rem",
            }}
          />
        </Paper>
        <Typography
          className="text-5xl font-bold text-sky-500 text-center"
          variant="h3"
          component="h1"
          fontWeight={700}
          fontSize={"3rem"}
          fontFamily={"var(--font-inter)"}
        >
          Dentora Pro
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFound;
