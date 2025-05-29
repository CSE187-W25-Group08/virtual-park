"use client"
import * as React from 'react';
import { Ticket } from '@/ticket';
import {listUnpaid} from './actions'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Typography, 
  Box,
  Tooltip,
  Button,
} from'@mui/material'
import { useRouter } from 'next/navigation';

export default function UnpaidList() {
  const [unpaid, setUnpaid] = React.useState<Ticket[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const setAppealData = async () => {
      const list = await listUnpaid();
      if (list) setUnpaid(list);
    }
    setAppealData();
  }, [])

    const handleManageTicket = async (ticket?: Ticket) => {
      router.push(`ticket/${ticket?.id}`);
    }
  
  // based on MUI https://mui.com/material-ui/react-list/
  const columns: GridColDef[] = [
    {
      field: 'issue',
      headerName: 'Issue Date',
      width: 200,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formatted = date.toLocaleString() || 'Invalid date';
        return <Typography noWrap>{formatted}</Typography>;
      },
    },
    {
      field: 'due',
      headerName: 'Due Date',
      width: 200,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formatted = date.toLocaleString() || 'Invalid date';
        return <Typography noWrap>{formatted}</Typography>;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
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
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 180 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'appeal',
      headerName: 'Appeal',
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 180 }}>
            {!params.value || params.value === 'null' ? 'none' : params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 120,
      renderCell: (params) => (
        <Typography noWrap>${params.value.toFixed(2)}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 180,
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleManageTicket(params.row)}
          >
            Manage Ticket
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Typography variant='h4' sx={{mb:4}}>Unpaid Tickets</Typography>
      {(unpaid && unpaid.length != 0) ? <DataGrid
        rows={unpaid}
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
          flex: 1,
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
        loading={unpaid.length === 0}
      />
      : <Typography>No Unpaid Tickets</Typography>}
    </Box>
  )
}