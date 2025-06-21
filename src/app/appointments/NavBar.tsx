"use client";
import * as React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { HealthAndSafety as HealthAndSafetyIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/action/actions";

type Setting = {
  label: string;
  action?: () => void;
};

const settings: Setting[] = [
  { label: "Juan Perez - Admin" },
  { label: "Logout" }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      handleCloseUserMenu();
    }
  };

  const handleMenuItemClick = (setting: Setting) => {
    if (setting.label === "Logout") {
      handleLogout();
    } else {
      handleCloseUserMenu();
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
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              sx={{ display: "none" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
            </Menu>
          </Box>

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
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dentora Pro
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Elvis Gomez" src="/static/images/avatar/2.jpg" />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.label} 
                  onClick={() => handleMenuItemClick(setting)}
                  disabled={setting.label === "Logout" && isLoggingOut}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {isLoggingOut && setting.label === "Logout" 
                      ? "Logging out..." 
                      : setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;