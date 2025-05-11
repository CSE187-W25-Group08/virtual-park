import * as React from "react";
import { Box} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Permit } from "../../../../permit";
import { getUserPermits } from "../../../permit/action";

export default function PermitCollapsable({ driverId }: { driverId: string }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "issueDate",
      headerName: "Violation",
      width: 110,
      //editable: true,
    },
    {
      field: "expDate",
      headerName: "Paid",
      width: 150,
      //editable: true,
    },
    {
      field: "type",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Due",
      width: 110,
      //editable: true,
    },
  ];


  const [permit, setPermit] = React.useState<Permit[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getUserPermits(driverId);
      if (result) {
        setPermit(result);
      }
    };
    fetchData();

  }, [driverId])

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
    >
      <DataGrid
        density="compact"
        rows={permit}
        columns={columns}
        getRowId={(row) => row.issueDate || Math.random().toString()}
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
