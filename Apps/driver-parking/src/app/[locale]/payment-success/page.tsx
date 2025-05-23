import { Typography } from "@mui/material";

export default function PaymentSucess({
  searchParams: {amount},
} : {
  searchParams: {amount : string},

})

{
  return (
    <Typography>You successfuly sent {amount}</Typography>
  );
}