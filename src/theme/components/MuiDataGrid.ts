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
                backgroundColor: theme.palette.pastel.red,

                '&:hover': {
                    backgroundColor: theme.palette.pastel.red,
                    filter: 'brightness(0.95)',
                },
            },

            '& .MuiDataGrid-row.success-mui-row': {
                backgroundColor: theme.palette.pastel.green,

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover.green,
                },
            },

            '& .MuiDataGrid-row.alert-mui-row': {
                backgroundColor: theme.palette.pastel.orange,

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover.orange,
                },
            },

            '& .MuiDataGrid-row.info-mui-row': {
                backgroundColor: theme.palette.pastel.blue,

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover.blue,
                },
            },
        },
    },
});