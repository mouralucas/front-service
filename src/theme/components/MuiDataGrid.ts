import { Theme } from '@mui/material/styles';

export const getMuiDataGrid = (theme: Theme) => ({
    styleOverrides: {
        root: {
            fontFamily: "'Quicksand', sans-serif",

            // Headers
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.paper,
                borderBottom: `2px solid ${theme.palette.divider}`,
            },

            '& .MuiDataGrid-columnHeader': {
                fontWeight: 600,
                color: theme.palette.text.primary,
            },

            '& .MuiDataGrid-columnSeparator': {
                visibility: 'hidden',
            },

            // Cells
            '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
            },

            // Row borders
            '& .MuiDataGrid-row': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },

            // Pagination
            '& .MuiTablePagination-root': {
                borderTop: `1px solid ${theme.palette.divider}`,
            },

            // Zebra rows
            '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: theme.palette.action.hover,
            },

            '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: 'transparent',
            },

            '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.action.hover,
            },

            // Status rows
            '& .MuiDataGrid-row.danger-mui-row': {
                backgroundColor: theme.palette.default.red,

                '&:hover': {
                    backgroundColor: theme.palette.default.red,
                    filter: 'brightness(0.95)',
                },
            },

            '& .MuiDataGrid-row.success-mui-row': {
                backgroundColor: theme.palette.default.green,

                '&:hover': {
                    backgroundColor: theme.palette.hovers.green,
                },
            },

            '& .MuiDataGrid-row.alert-mui-row': {
                backgroundColor: theme.palette.default.orange,

                '&:hover': {
                    backgroundColor: theme.palette.hovers.orange,
                },
            },

            '& .MuiDataGrid-row.info-mui-row': {
                backgroundColor: theme.palette.default.blue,

                '&:hover': {
                    backgroundColor: theme.palette.hovers.blue,
                },
            },
        },
    },
});