// libraries
import * as React from 'react';
// components
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { 
  DataGrid
} from '@mui/x-data-grid';
import Empty from '../Empty';
// styles
import './index.css'

export default function Grid(props) {

  const statusFormatter = (status) => {
    switch (status) {
      case 'pending':
        return <Chip size='small' label="pending" color="warning" />
      case 'completed':
        return <Chip size='small' label="completed" color="success" />
      case 'failed':
        return <Chip size='small' label="failed" color="error" />
    }
  }

  const currencyFormatter = (value) => {
    parseInt(value).toLocaleString()
  }

  const columns = [
    { 
      field: 'from_amount', 
      headerName: 'From (USD)', 
      width: 150,
      valueFormatter: (params) => `$${parseInt(params.value).toLocaleString()}`
    },
    { 
      field: 'to_amount', 
      headerName: 'To (PHP)',
      valueFormatter: (params) => `₱${parseInt(params.value).toLocaleString()}`, 
      width: 150 
    },
    { field: 'rate', headerName: 'Rate', width: 150 },
    { 
      field: 'created_at', 
      headerName: 'Created At', 
      type: 'dateTime', 
      width: 200, valueGetter: (timestamp) => new Date(timestamp.value.seconds * 1000)
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => statusFormatter(params.value)
    },
  ];


  const EmptyRows = () => {
    return <Empty onButtonClick={props.onEmptyClick} />
  }


  
  return (
    <Box sx={{ height: '70vh', width: '100%', marginTop: '10px' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        loading={props.loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: EmptyRows
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
             outline: "none !important",
          },
       }}
      />
    </Box>
  );
}