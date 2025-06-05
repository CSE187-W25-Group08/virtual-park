"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import logo from "../public/img/sprite-logo.svg";
import hoody from "../public/img/Front.png";
import marketcard from "../public/img/300.png";
import cat from "../public/img/bg-desktop.png";
import { useTranslations } from "next-intl";

import { useTheme, Theme } from "@mui/material/styles";
import LotList from "./LotList";
export default function Marketing() {
  const t = useTranslations("landing");
  const theme = useTheme<Theme>();
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
          {/* Search and Menu Icons */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton edge="end" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit">
              <MenuIcon />
            </IconButton>
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
