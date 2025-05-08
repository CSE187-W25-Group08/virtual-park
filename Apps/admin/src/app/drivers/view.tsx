// based on MUI https://mui.com/material-ui/react-list/
'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { fetchDrivers, suspendDriver } from './action';
import { Driver } from '@/driver';

export default function DriversGrid() {
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const [suspendDisabled, setSuspendDisabled] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    const setDriverData = async () => {
      const driverList = await fetchDrivers();
      if (driverList) setDrivers(driverList);
      console.log(driverList[0])
    };
    setDriverData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: '',
      width: 80,
      renderCell: () => (
        <PersonIcon sx={{ fontSize: 40, color: 'action.active' }} />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      renderCell: (params) => params.value || 'No email',
    },
    {
      field: 'joinDate',
      headerName: 'Join Date',
      width: 200,
      renderCell: (params) => params.value || 'Unknown date',
    },
    {
      field: 'actions',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleSuspend(params.row?.email)}
          disabled={suspendDisabled.has(params.row?.email)}
        >
          Suspend
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
  ];  

  const handleSuspend = async (email?: string) => {
    if (!email) return;
    setSuspendDisabled((prev) => new Set([...prev, email]));
    await suspendDriver(email);
    console.log('Suspending user:', email);
    alert(`Suspend functionality for ${email}`);
  };

  return (
    <Box sx={{ 
      height: 800, 
      width: '100%',
      '& .MuiDataGrid-root': {
        border: '5px solid black',
        borderRadius: 0
      }
    }}>
      <DataGrid
        rows={drivers}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
        disableColumnResize
        getRowId={(row) => row.email || Math.random().toString()}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '2px solid black',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            borderBottom: '3px solid black',
          },
        }}
        loading={drivers.length === 0}
      />
    </Box>
  );
}
