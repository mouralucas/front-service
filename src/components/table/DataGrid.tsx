import { DataGrid as MuiDataGrid, GridDensity, GridRowIdGetter } from '@mui/x-data-grid';
import { Box } from '@mui/material';


interface DataGridProps {
    columns: any;
    data: any[] | undefined;
    isLoading?: boolean;
    pageSizeOptions?: number[];
    pageSize?: number;
    checkBoxSelection?: boolean;
    disableRowSelectionOnClick?: boolean;
    // onRowClick?: () => null;
    onRowClick: any;
    getRowId?: GridRowIdGetter<any>;
    getRowClassName?: any;
    getRowHeight?: any;
    columnVisibilityModel?: any;
    getTreeDataPath?: any;
    density?: GridDensity;
    sx?: any;
}

const DataGrid = (props: DataGridProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <MuiDataGrid
                rows={props.data}
                columns={props.columns}
                autoHeight // TODO: update this attr
                density={props.density ?? 'compact'}
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
                getRowClassName={props.getRowClassName}
                getRowHeight={props.getRowHeight ?? (() => 'auto')}
                columnVisibilityModel={props.columnVisibilityModel ?? {}}
                sx={props.sx ?? {}}

            />
        </Box>
    );
};

export default DataGrid;
