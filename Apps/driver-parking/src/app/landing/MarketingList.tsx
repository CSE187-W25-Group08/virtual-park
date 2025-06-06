import { Box, CardMedia, Divider, Typography } from "@mui/material";
import dashboardPage from "../public/img/dashboard_page.png";
import ticketPage from "../public/img/tickets_page.png";
import vehiclesPage from "../public/img/vehicle_page.png";

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
      <CardMedia component="img" alt={title} image={image} sx={{ width:"100%", height: "auto", aspectRatio: "382/852" }} />
    </Box>
  );
}

export default function MarketingList() {
  // Data array for the cards
  const cards = [
    {
      title: "Dashboard",
      description:
        "Track your tickets with our easy to use ticket interface. Check which tickets you have available to pay and which you can apply for an appeal.",
      image: dashboardPage.src,
    },
    {
      title: "Vehicles",
      description:
        "Manage your vehicles efficiently with our comprehensive tools and resources.",
      image: vehiclesPage.src,
    },
    {
      title: "Tickets",
      description:
        "Track your tickets with our easy to use ticket interface. Check which tickets you have available to pay and which you can apply for an appeal.",
      image: ticketPage.src,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5}}>
      <Typography variant="h4"><strong>Welcome to the Virtual Park</strong></Typography>
      <Box sx={{ display: "flex", gap: 5, width: "50%", justifyContent: "space-between" }}>
        {cards.map((card, index) => (
          <MarketingCard key={index} {...card} />
        ))}
      </Box>
    </Box>
  );
}
