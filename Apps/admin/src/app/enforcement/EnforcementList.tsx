"use client"
import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Typography, 
  Box,
  Tooltip,
} from'@mui/material'

const testData = [
  {
    id: 1,
    name: 'Officer 1',
    email: 'officer1@taps.ucsc',
    hired: '2020-06-15T12:00:00+00:00',
  },
  {
    id: 2,
    name: 'Officer 2',
    email: 'officer2@taps.ucsc',
    hired: '2020-06-15T12:00:00+00:00',
  },
]

export default function EnforcementList() {  
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Officer Name',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'id',
      headerName: 'Enforcment ID',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography noWrap sx={{ maxWidth: 230 }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'hired',
      headerName: 'Date Hired',
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value)
        return date.toLocaleString() || 'Invalid date'
      },
    },
  ]
  return (
    <Box>
      <Typography variant='h4' sx={{mb:4}}>Enforcement Officers</Typography>
      {(testData && testData.length != 0) ? <DataGrid
        rows={testData}
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
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
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
        loading={testData.length === 0}
      />
      : <Typography>No Active Enforcement Officers</Typography>}
    </Box>
  )
}