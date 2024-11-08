import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  NoteAltRounded as NoteAltRoundedIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { AccountButton } from "../AccountButton/AccountButton";

const Header = ({ isLoggedIn, setIsLoggedIn, setAlertInfo, user, setUser }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pages = [
    { label: "My Notes", to: "/my-notes" },
    { label: "Recommendations", to: "/recommendations" },
    { label: "Chat", to: "/chat" },
  ];

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

  const getInitials = () => {
    if (user) {
      return (
        user.firstName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase()
      );
    }
    return "";
  };

  const loggedInUserView = () => (
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar>{getInitials()}</Avatar>
      </IconButton>
    </Tooltip>
  );

  const notLoggedInView = () => (
    <div>
      <AccountButton
        startIcon={<LoginIcon />}
        variant="contained"
        href="/login"
        className="user-buttons"
      >
        Login
      </AccountButton>
      <AccountButton
        startIcon={<PersonAddIcon />}
        variant="contained"
        href="/register"
        className="user-buttons"
      >
        Register
      </AccountButton>
    </div>
  );

  const logout = () => {
    handleCloseUserMenu();
    setAlertInfo({
      show: true,
      type: "success",
      message: "Logged out successfully!",
    });

    setTimeout(() => {
      setUser(null);
      setAlertInfo({ show: false });
      window.location.reload();
      setIsLoggedIn(false);
      navigate("/");
      console.log(user);
    }, 3000);
  };

  const settings = [
    { label: "Account", onClick: handleCloseUserMenu },
    { label: "Logout", onClick: logout },
    { label: "placeHolder 1", onClick: handleCloseUserMenu },
    { label: "placeHolder 2", onClick: handleCloseUserMenu },
  ];

  const barStyle = { height: 80, justifyContent: "center" };
  const appNameStyle = {
    mr: 5,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };
  const pagesStyle = { my: 2, color: "white", display: "block", fontSize: 14 };

  return (
    <AppBar position="static" sx={barStyle}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <NoteAltRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={appNameStyle}
          >
            TaskIt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
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
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NoteAltRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                variant="outlined"
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={pagesStyle}
                component={Link}
                to={page.to}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? loggedInUserView() : notLoggedInView()}

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
                <MenuItem key={setting.label} onClick={setting.onClick}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
