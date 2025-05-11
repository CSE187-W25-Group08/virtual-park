import * as React from "react";
import { Box} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUserVehicles } from "../../../vehicle/action";
import { Vehicle } from "../../../../driver";

export default function VehicleCollapsable({ driverId }: { driverId: string }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "licensePlate",
      headerName: "Violation",
      width: 110,
      //editable: true,
    },
    {
      field: "make",
      headerName: "Paid",
      width: 150,
      //editable: true,
    },
    {
      field: "model",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "color",
      headerName: "Due",
      width: 110,
      //editable: true,
    },
  ];


  const [vehicle, setVehicle] = React.useState<Vehicle[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getUserVehicles(driverId);
      if (result) {
        setVehicle(result);
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
        rows={vehicle}
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
