"use client"
import * as React from 'react';
import { Ticket } from '@/ticket';
import {listAppeals} from './actions'
import { GridColDef } from '@mui/x-data-grid';
import {
  Typography, 
  Box,
} from'@mui/material'

export default function AppealsList() {
  const [appeals, setAppeals] = React.useState<Ticket[]>([]);

  React.useEffect(() => {
    const setAppealData = async () => {
      const list = await listAppeals();
      if (list) setAppeals(list);
      console.log(appeals);
    }
    setAppealData();
  }, [appeals])

  // based on MUI https://mui.com/material-ui/react-list/
  /*
  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: '',
      width: 80,
      renderCell: () => (
        <></>
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
  ]
  */

  return (
  <Box>
    <Typography>Active Appeals</Typography>

  </Box>
  )
}