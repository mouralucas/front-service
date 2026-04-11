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
                borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            },


            // Pagination
            '& .MuiTablePagination-root': {
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            },

            // Zebra rows
            '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },

            '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: 'transparent',
            },

            // Hover
            '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },

            // Status rows
            '& .MuiDataGrid-row.danger-mui-row': {
                backgroundColor: theme.palette.pastel?.red || '#ffcccc',

                '&:hover': {
                    backgroundColor: theme.palette.pastel?.red || '#ffcccc',
                    opacity: 0.85,
                },
            },

            '& .MuiDataGrid-row.success-mui-row': {
                backgroundColor: theme.palette.pastel?.green || '#ccffcc',

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover?.green || '#ccffcc',
                    opacity: 0.85,
                },
            },

            '& .MuiDataGrid-row.alert-mui-row': {
                backgroundColor: theme.palette.pastel?.orange || '#ffddcc',

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover?.orange || '#ffddcc',
                    opacity: 0.85,
                },
            },

            '& .MuiDataGrid-row.info-mui-row': {
                backgroundColor: theme.palette.pastel?.blue || '#ccddff',

                '&:hover': {
                    backgroundColor: theme.palette.pastel_hover?.blue || '#ccddff',
                    opacity: 0.85,
                },
            },
        },
    },
});
