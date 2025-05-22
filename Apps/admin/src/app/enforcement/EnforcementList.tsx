'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridFooter } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import { Enforcement, NewEnforcement } from '../../enforcement'
import { createEnforcement, getEnforcement } from './actions'
import CreationModal from './CreationModal'

export default function EnforcementList() {
  const [enforcementList, setEnforcementList] = useState<Enforcement[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchEnforcement = async () => {
      const data = await getEnforcement()
      if (data) {
        setEnforcementList(data)
      }
    }
    fetchEnforcement()
  }, [])

  const handleOpenCreationModal = () => {
    setModalOpen(true)
  }

  const handleCloseCreationModal = () => {
    setModalOpen(false)
  }

  const handleSubmitCreation = async (details: NewEnforcement) => {
    const newEnforcer = await createEnforcement(details)
    if (newEnforcer) {
      setEnforcementList((prev) => [...prev, newEnforcer])
    } else {
      alert('Failed to create new enforcement officer')
    }
  }

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
      field: 'enforcementId',
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
      field: 'hireDate',
      headerName: 'Account Created',
      width: 200,
      flex: 1,
      renderCell: (params) => params.value || 'Unknown date',
    },
  ]
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Enforcement Officers
      </Typography>
      {enforcementList && enforcementList.length != 0 ? (
        <DataGrid
          rows={enforcementList}
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
          slots={{
            footer: () => (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  onClick={handleOpenCreationModal}
                  sx={{
                    p: 1,
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#eeeeee',
                    },
                  }}
                >
                  <Typography sx={{ color: '#757575' }}>
                    + Add new enforcement officer
                  </Typography>
                </Box>
                <GridFooter />
              </Box>
            ),
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
            },
          }}
          loading={enforcementList.length === 0}
        />
      ) : (
        <Typography>No Active Enforcement Officers</Typography>
      )}
      <CreationModal
        open={modalOpen}
        onClose={handleCloseCreationModal}
        onSubmit={handleSubmitCreation}
      />

    </Box>
  )
}
