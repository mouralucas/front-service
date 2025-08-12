import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';



interface DataGridProps {
    columns: any;
    data: any[];
}

const DataGridComp = ({
    columns,
    data,
    isLoading = false,
    initialState = {},
    pageSize = 15,
    rowHeight = 35,
    variant = 'light',
    multipleLinesCells = false,
    padding = 0,
    search = undefined,
    emptyStateComponent = undefined,
    footer = undefined,
    hideFooter = false,
    onRowClick = undefined,
    getRowId = undefined,
    autoPageSize = false,
    size = 'normal',
    sx = undefined,
}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid 
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default DataGridComp;