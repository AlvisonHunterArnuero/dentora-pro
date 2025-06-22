"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoutIcon from "@mui/icons-material/Logout";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/server-actions";
import { getUserInformation } from "../services/users.service";
import { useState } from "react";
import { Button } from "@mui/material";

type UserData = {
  fullName: string;
  role: string;
};

export default function ResponsiveAppBar() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    role: "",
  });

  React.useEffect(() => {
    getUserInformation().then((data) => {
      if (data) {
        setUserData({
          fullName: data.fullName ? data.fullName : "",
          role: data.role ? data.role : "",
        });
      }
    });
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };


  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HealthAndSafetyIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>

          <HealthAndSafetyIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {userData.role} {userData.fullName}{" "}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ flexGrow: 1, color: "white" }}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
