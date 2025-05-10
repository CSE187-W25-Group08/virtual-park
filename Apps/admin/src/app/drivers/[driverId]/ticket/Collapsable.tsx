import * as React from "react";
import { Box} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { listAll, listPaid, listUnpaid } from "../../../ticket/action";
import { Ticket } from "../../../../ticket";
import { ConstructionOutlined } from "@mui/icons-material";

export default function TicketCollapsable({ driverId }: { driverId: string }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "violation",
      headerName: "Violation",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "paid",
      headerName: "Paid",
      type: "number",
      width: 150,
      editable: true,
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
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "issue",
      headerName: "Issue",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "appeal",
      headerName: "Appeal",
      type: "number",
      width: 110,
      editable: true,
    },
  ];


  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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


  }, [driverId])

  return (
    <Box
      sx={{ width: "100%", height: 270, bgcolor: "background.paper" }}
      component="nav"
    >
            {ticket.map((ticket, index) => (
        <div key={index}>{ticket.id}</div> 
      ))}
      <DataGrid
        density="compact"
        rows={rows}
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
