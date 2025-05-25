// based on MUI https://mui.com/material-ui/react-list/
'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import {
  Button, 
  Box,
} from'@mui/material'
import { 
  fetchDrivers, 
  // reactivateDriver, 
  // suspendDriver,
} from './action';
import { Driver } from '@/driver';
import { useRouter } from 'next/navigation'

export default function DriversGrid() {
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  // const [suspendDisabled, setSuspendDisabled] = React.useState<Set<string>>(new Set());

  const router = useRouter()

  React.useEffect(() => {
    const setDriverData = async () => {
      const driverList = await fetchDrivers();
      if (driverList) setDrivers(driverList);
    };
    setDriverData();
  }, []);
  // revisit info used in this page
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
      width: 300,
      renderCell: (params) => (
        <Box>
        {/* <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleSuspend(params.row?.email)}
          disabled={suspendDisabled.has(params.row?.email)}
          sx={{marginRight: 1}}
        >
          Suspend
        </Button>
        <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => handleReactivate(params.row?.email)}
        disabled={!suspendDisabled.has(params.row?.email)}
        sx={{marginRight: 1}}
      >
        Reactivate
      </Button> */}
        <Button
        variant="contained"
        color="info"
        size="small"
        onClick={() => handleOpenDriver(params.row)}
        // disabled={suspendDisabled.has(params.row?.email)}
      >
        Details
      </Button>
      </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ];  

  // const handleSuspend = async (email?: string) => {
  //   if (!email) return;
  //   setSuspendDisabled((prev) => new Set([...prev, email]));
  //   await suspendDriver(email);
  //   console.log('Suspending user:', email);
  //   alert(`Suspend functionality for ${email}`);
  // };

  // const handleReactivate = async (email?: string) => {
  //   if (!email) return;
  //   setSuspendDisabled((prev) => new Set([...prev].filter((e) => e !== email)));
  //   await reactivateDriver(email);
  //   console.log('Reactivating user:', email);
  //   alert(`Reactivate functionality for ${email}`);
  // }

  const handleOpenDriver = async (driver?: Driver) => {
    router.push('/drivers/' + driver?.jwt)
  }

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
        getRowId={(row) => row.jwt}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
        disableColumnResize
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
