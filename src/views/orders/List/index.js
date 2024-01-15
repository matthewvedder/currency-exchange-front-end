// libraries
import * as React from 'react';
// components
import Box from '@mui/material/Box';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Button from '@mui/material/Button';
import { 
  DataGrid, 
  GridToolbarContainer,
} from '@mui/x-data-grid';
import Empty from '../Empty';
// styles
import './index.css'

function GridToolbar() {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<CurrencyExchangeIcon />}>
      Exchange Currency
      </Button>
    </GridToolbarContainer>
  );
}


export default function Grid(props) {

  const rows = [

  ];

  const columns = [
    { field: 'from_amount', headerName: 'From - USD', width: 150 },
    { field: 'to_amount', headerName: 'To - PHP', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];


  
  return (
    <Box sx={{ height: '70vh', width: '100%', marginTop: '100px', maxWidth: '767px' }}>
      <DataGrid
        rows={rows}
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
          toolbar: GridToolbar,
          noRowsOverlay: Empty
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