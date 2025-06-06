"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme, Theme } from "@mui/material/styles";

import logo from "../public/img/sprite-logo.svg";
import hoody from "../public/img/Front.png";
import marketcard from "../public/img/300.png";
import cat from "../public/img/bg-desktop.png";
import LotList from "./LotList";
import { logout } from "../[locale]/login/action";
import MarketingList from "./MarketingList";

export default function Marketing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const t = useTranslations("landing");
  const theme = useTheme<Theme>();

  useEffect(() => {
    const session = window.sessionStorage.getItem("name");
    setIsAuthenticated(!!session);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    window.sessionStorage.clear();
    window.location.reload();
  };

  const NavBarButtons = () => {
    return (
      <Box sx={{ display: "flex" }}>
        {!isAuthenticated && [
          <MenuItem
            key="login"
            onClick={() => {
              router.push("/login");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("login")}</ListItemText>
          </MenuItem>,
          <MenuItem
            key="signup"
            onClick={() => {
              router.push("/signup");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("signup")}</ListItemText>
          </MenuItem>,
        ]}
        {isAuthenticated && (
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("logout")}</ListItemText>
          </MenuItem>
        )}
      </Box>
    );
  };

  const NavbarHelper = () => {
    return (
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Text */}
          <Box display="flex" alignItems="center" gap={1}>
            <Image src={logo} alt="Virtual Park Logo" width={40} height={40} />
            <Typography
              variant="h6"
              component="div"
              color="primary"
              sx={{ color: "primary" }}
            >
              <strong>Virtual Park</strong>
            </Typography>
          </Box>

          <NavBarButtons></NavBarButtons>
        </Toolbar>
      </AppBar>
    );
  };

  const BackgroundHelper = () => {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          backgroundImage: `url(${cat.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Spacer for fixed AppBar height */}
        <Box sx={{ ...theme.mixins.toolbar }} />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", px: 2 }}
            color="white"
          >
            {t("moto-split-1")}
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", px: 2 }}
            color="primary"
          >
            {t("moto-split-2")}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <NavbarHelper />
      <BackgroundHelper />

      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={logo} alt="Virtual Park Logo" width={150} height={150} />
        <MarketingList />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Divider
            sx={{
              color: "primary.main",
              "&::before, &::after": { borderColor: "primary.main" },
            }}
          >
            <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
              <strong>Our merch</strong>
            </Typography>
          </Divider>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: "23%",
              height: "30%",
              minHeight: "42vh",
              backgroundImage: `url(${hoody.src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Box
            sx={{
              width: "30%",
              minHeight: "30vh",
              backgroundImage: `url(${marketcard.src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          mt: 5,
        }}
        bgcolor="primary.main"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AgricultureIcon
            fontSize="large"
            sx={{ color: "white" }}
          ></AgricultureIcon>
          <Typography variant="h4" color="white">
            <strong>Made by the Squad</strong>
          </Typography>
          <AgricultureIcon
            fontSize="large"
            sx={{ color: "white" }}
          ></AgricultureIcon>
        </Box>
        <Typography variant="h4" color="black">
          <strong>Bodie, Hamza, Jackson, Jen, Jin, Matthew</strong>
        </Typography>
      </Box>
    </Box>
  );
}
