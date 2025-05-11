import * as React from "react";
import { Box} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { listAll} from "../../../ticket/action";
import { Ticket } from "../../../../ticket";

export default function TicketCollapsable({ driverId }: { driverId: string }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "violation",
      headerName: "Violation",
      width: 110,
      //editable: true,
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 150,
      //editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "due",
      headerName: "Due",
      width: 110,
      //editable: true,
    },
    {
      field: "issue",
      headerName: "Issue",
      width: 110,
      //editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 110,
      //editable: true,
    },
    {
      field: "appeal",
      headerName: "Appeal",
      width: 110,
      //editable: true,
    },
  ];


  const [ticket, setTicket] = React.useState<Ticket[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await listAll(driverId);
      if (result) {
        setTicket(result);
      }
    };
    fetchData();


  }, [driverId, ticket])

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
    >
      <DataGrid
        density="compact"
        rows={ticket}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        autoHeight={false}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
