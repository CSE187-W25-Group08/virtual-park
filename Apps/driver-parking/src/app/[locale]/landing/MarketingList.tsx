'use client';

import { Box, CardMedia, Divider, Typography } from "@mui/material";
import dashboardPage from "../../public/img/dashboard_page.png";
import ticketPage from "../../public/img/tickets_page.png";
import vehiclesPage from "../../public/img/vehicle_page.png";
import { useTranslations } from "next-intl";

// Reusable card component
function MarketingCard({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <Box sx={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Box sx={{ width: "100%" }}>
        <Divider
          sx={{
            color: "primary.main",
            "&::before, &::after": { borderColor: "primary.main" },
          }}
        >
          <Typography variant="h5">
            <strong>{title}</strong>
          </Typography>
        </Divider>
      </Box>
      <Typography align="center">{description}</Typography>
      <CardMedia component="img" alt={title} image={image} sx={{ width: "100%", height: "auto", aspectRatio: "382/852" }} />
    </Box>
  );
}

export default function MarketingList() {
  const t = useTranslations("marketing");

  // Data array for the cards
  const cards = [
    {
      title: t("dashboard.title"),
      description: t("dashboard.description"),
      image: dashboardPage.src,
    },
    {
      title: t("vehicles.title"),
      description: t("vehicles.description"),
      image: vehiclesPage.src,
    },
    {
      title: t("tickets.title"),
      description: t("tickets.description"),
      image: ticketPage.src,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <Typography variant="h4"><strong>{t("welcome")}</strong></Typography>
      <Box sx={{ display: "flex", gap: 5, width: "50%", justifyContent: "space-between" }}>
        {cards.map((card, index) => (
          <MarketingCard key={index} {...card} />
        ))}
      </Box>
    </Box>
  );
}
