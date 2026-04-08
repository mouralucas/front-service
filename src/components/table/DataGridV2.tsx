import { DataGrid, GridDensity, GridRowIdGetter } from '@mui/x-data-grid';
import { Box } from '@mui/material';
// import '../../assets/core/components/tablev2.css'


interface DataGridProps {
    columns: any;
    data: any[];
    isLoading?: boolean;
    pageSizeOptions?: number[];
    pageSize?: number;
    checkBoxSelection?: boolean;
    disableRowSelectionOnClick?: boolean;
    onRowClick?: () => null;
    getRowId?: GridRowIdGetter<any>;
    getRowClassName?: any;
    getRowHeight?: any;
    columnVisibilityModel?: any;
    getTreeDataPath?: any;
    density?: GridDensity;
    sx?: any;
}

const DataGridComp = (props: DataGridProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                autoHeight // TODO: update this attr
                density={props.density ?? 'compact'}
                rows={props.data}
                columns={props.columns}
                loading={props.isLoading ?? false}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: props.pageSize ?? 10,
                        },
                    },
                }}
                pageSizeOptions={props.pageSizeOptions ?? [5, 10, 30, 50, 100]}
                checkboxSelection={props.checkBoxSelection ?? false}
                disableRowSelectionOnClick={props.disableRowSelectionOnClick ?? true}
                onRowClick={props.onRowClick}
                getRowId={props.getRowId ?? ((row: any) => row.id)}
                getRowClassName={props.getRowClassName ?? ''}
                getRowHeight={props.getRowHeight ?? (() => 'auto')}
                columnVisibilityModel={props.columnVisibilityModel ?? {}}
                sx={props.sx || null}

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
