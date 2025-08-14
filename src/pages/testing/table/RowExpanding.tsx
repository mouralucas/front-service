import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Collapse, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Nome', width: 150 },
  { field: 'age', headerName: 'Idade', width: 110 },
];

const initialRows = [
  { id: 1, name: 'Lucas', age: 25 },
  { id: 2, name: 'Maria', age: 32 },
  { id: 3, name: 'João', age: 45 },
];

const ExpandableRowGrid = () => {
  const [rows, setRows] = React.useState(initialRows);
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

  const handleRowClick = (params: any) => {
    setExpandedRow(expandedRow === params.id ? null : params.id);
  };

  // Aqui criamos linhas "virtualmente" incluindo a linha de detalhes logo após a original
  const rowsWithDetails = rows.flatMap((row) => {
    const detailRow = {
      id: `${row.id}-detail`,
      isDetail: true,
      parentId: row.id,
    };
    return expandedRow === row.id ? [row, detailRow] : [row];
  });

  const columnsWithDetail: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      renderCell: (params) => {
        if (params.row.isDetail) {
          return (
            <Box sx={{ p: 2, width: '100%' }}>
              <Collapse in>
                <Typography variant="body2">
                  Aqui você pode renderizar um gráfico ou uma tabela relacionada ao ID: {params.row.parentId}
                </Typography>
                {/* Exemplo de gráfico/tabela aqui */}
              </Collapse>
            </Box>
          );
        }
        return params.value;
      },
    },
    { field: 'age', headerName: 'Idade', width: 110 },
  ];

  return (
    <Box sx={{ height: 500 }}>
      <DataGrid
        columns={columnsWithDetail}
        rows={rowsWithDetails}
        getRowId={(row) => row.id}
        onRowClick={(params) => {
          if (!params.row.isDetail) {
            handleRowClick(params);
          }
        }}
        hideFooter
        rowHeight={40}
        getRowHeight={(params) => (params.model.isDetail ? 150 : 40)}
      />
    </Box>
  );
}

export default ExpandableRowGrid;