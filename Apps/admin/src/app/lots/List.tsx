"use client"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Typography, 
  Box,
  Tooltip,
  // Button,
} from'@mui/material'
import { getLots } from './action';
import { Lot } from '../../lot';

export default function LotList() {
  const [lots, setLots] = React.useState<Lot[]>([]);

  React.useEffect(() => {
    const setLotData = async () => {
      const list = await getLots();
      if (list) setLots(list);
    }
    setLotData();
  }, [])
  
  // based on MUI https://mui.com/material-ui/react-list/
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 130,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography noWrap sx={{ maxWidth: 180 }}>
          {params.value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: 'zone',
    headerName: 'Zone',
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography noWrap>{params.value}</Typography>
      </Tooltip>
    ),
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 320,
    flex: 1,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography noWrap>{params.value}</Typography>
      </Tooltip>
    ),
  },
  {
    field: 'latitude',
    headerName: 'Latitude',
    width: 100,
    renderCell: (params) => (
      <Typography noWrap>{params.value}</Typography>
    ),
  },
  {
    field: 'longitude',
    headerName: 'Longitude',
    width: 100,
    renderCell: (params) => (
      <Typography noWrap>{params.value}</Typography>
    ),
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    width: 100,
    renderCell: (params) => (
      <Typography noWrap>{params.value}</Typography>
    ),
  },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 100,
    renderCell: (params) => (
      <Typography noWrap>{params.value ? 'Yes' : 'No'}</Typography>
    ),
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography noWrap>{params.value}</Typography>
      </Tooltip>
    ),
  },
  {
    field: 'created',
    headerName: 'Created At',
    width: 120,
    renderCell: (params) => {
      const date = new Date(params.value);
      const formatted = date.toLocaleDateString('en-US');
      return <Typography noWrap>{formatted}</Typography>;
    },
  },
  {
    field: 'updated',
    headerName: 'Updated At',
    width: 120,
    renderCell: (params) => {
      const date = new Date(params.value);
      const formatted = date.toLocaleDateString('en-US');
      return <Typography noWrap>{formatted}</Typography>;
    },
  },
];
  
  return (
    <Box>
      <Typography variant='h4' sx={{mb:4}}>Parking Lots</Typography>
      {(lots && lots.length != 0) ? <DataGrid
        rows={lots}
        columns={columns}
        initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
        disableColumnResize
        getRowId={(row) => row.id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
        sx={{
          // '& .MuiDataGrid-cell': {
          //   borderBottom: '2px solid black',
          // },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            // borderBottom: '3px solid black',
          },
          '& .MuiDataGrid-row.even': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-row.odd': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e6f7ff',
          }
        }}
        loading={lots.length === 0}
      />
      : <Typography>No Parking Lots</Typography>}
    </Box>
  )
}