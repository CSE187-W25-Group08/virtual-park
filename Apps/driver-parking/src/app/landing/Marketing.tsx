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
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

export default function Marketing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter();
  const t = useTranslations("landing");
  const theme = useTheme<Theme>();

  useEffect(() => {
    const session = window.sessionStorage.getItem('name')
    setIsAuthenticated(!!session)
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    window.sessionStorage.clear()
    window.location.reload()
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Text */}
          <Box display="flex" alignItems="center" gap={1}>
            <Image src={logo} alt="Virtual Park Logo" width={40} height={40} />
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              Virtual Park
            </Typography>
          </Box>
          {/* Menu Icon */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="menu options"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              disableScrollLock
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  maxWidth: '90vw',
                  width: '200px'
                }
              }}
            >
              {!isAuthenticated && [
                <MenuItem key="login" onClick={() => { router.push('/login'); handleMenuClose(); }}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('login')}</ListItemText>
                </MenuItem>,
                <MenuItem key="signup" onClick={() => { router.push('/signup'); handleMenuClose(); }}>
                  <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('signup')}</ListItemText>
                </MenuItem>
              ]}
              {isAuthenticated && (
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('logout')}</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "60vh",
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
            {t("moto")}
          </Typography>
        </Box>
      </Box>


<LotList/>
<Box sx = {{display: 'flex', flexDirection: "column", alignItems: 'center'} }>

<Typography>Our merch</Typography>

      <Box
        sx={{
             width: "30%",
          minHeight: "60vh",
          backgroundImage: `url(${hoody.src})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
             backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          width: "30%",
          minHeight: "60vh",
          backgroundImage: `url(${marketcard.src})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
             backgroundPosition: "center",
        }}
      />
    </Box>





    </Box>
  );
}
