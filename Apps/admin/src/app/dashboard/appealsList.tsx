"use client"
import * as React from 'react';
import { Ticket } from '@/ticket';
import {listAppeals} from './actions'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Typography, 
  Box,
  Tooltip,
  Button,
} from'@mui/material'

export default function AppealsList() {
  const [appeals, setAppeals] = React.useState<Ticket[]>([]);

  React.useEffect(() => {
    const setAppealData = async () => {
      const list = await listAppeals();
      if (list) setAppeals(list);
      console.log("in view", appeals);
    }
    setAppealData();
  }, [])

  const handleManageAppeal = async (ticket?: Ticket) => {
    alert(`going to appeal of ${ticket?.id}`);
  }
  
  // based on MUI https://mui.com/material-ui/react-list/
  const columns: GridColDef[] = [
    {
      field: 'lot',
      headerName: 'Lot',
      width: 150,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'issue',
      headerName: 'Issue Date',
      width: 200,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString() || 'Invalid date';
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'violation',
      headerName: 'Violation',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 180 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: '',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleManageAppeal(params.row)}
        >
          Manage Appeal
        </Button>
      ),
    },
  ];
  return (
  <Box>
    <Typography>Active Appeals</Typography>
    {(appeals && appeals.length != 0) ? <DataGrid
  rows={appeals}
  columns={columns}
  initialState={{
    pagination: { paginationModel: { pageSize: 10 } },
  }}
  pageSizeOptions={[10, 20, 50]}
  density="compact"
  disableColumnResize
  getRowId={(row) => row.id || Math.random().toString()}
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
  loading={appeals.length === 0}
/>
: <Typography>No Active Appeals</Typography>}
  </Box>
  )
}