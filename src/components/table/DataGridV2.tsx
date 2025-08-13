import { DataGrid, GridRowIdGetter } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataGridProps {
    columns: any;
    data: any[];
    isLoading?: boolean;
    checkBoxSelection?: boolean;
    disableRowSelectionOnClick?: boolean;
    onRowClick?: () => null;
    getRowId?: GridRowIdGetter<any>;
}

const DataGridComp = (props: DataGridProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid 
                rows={props.data}
                columns={props.columns}
                loading={props.isLoading ?? false}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 30, 100]}
                checkboxSelection={props.checkBoxSelection ?? false}
                disableRowSelectionOnClick={props.disableRowSelectionOnClick ?? true}
                onRowClick={props.onRowClick}
                getRowId={props.getRowId ?? ((row: any) => row.id)}
            />
        </Box>
    );
};

export default DataGridComp;

/*
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
*/
