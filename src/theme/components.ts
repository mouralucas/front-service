import { Theme } from '@mui/material/styles';
import { getCssVariables } from './tokens';
import TypographyTheme from './typography';
import { COLORS } from './colors';

export const getComponents = (theme: Theme) => ({
    MuiCssBaseline: {
        styleOverrides: {
            ...getCssVariables(theme),

            '*, *::before, *::after': {
                boxSizing: 'border-box',
            },

            body: {
                margin: 0,
                color: '#333',
                backgroundColor: theme.palette.background.default,
            },
        },
    },

    MuiOutlinedInput: {
        styleOverrides: {
            notchedOutline: {
                border: "1px solid rgba(0, 0, 0, 0.23)",
            },
        },
    },

    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: 24,
            },
        },
    },

    MuiPaginationItem: {
        styleOverrides: {
            root: {
                border: 'none',
            },
            previousNext: {
                border: '1px solid rgba(0, 0, 0, 0.23) !important',
            },
        },
    },

    MuiFormControlLabel: {
        styleOverrides: {
            label: {
                ...TypographyTheme.body1_lato,
                color: COLORS.BLACK,
            },
        },
    },

    MuiChip: {
        variants: [
            {
                props: { variant: "danger" as any },
                style: {
                    backgroundColor: COLORS.PASTEL_RED,
                    "& .MuiChip-label": {
                        color: COLORS.WHITE,
                    },
                },
            },
        ],
    },

    MuiDataGrid: {
    styleOverrides: {
        root: {
            fontFamily: "'Quicksand', sans-serif",

            // Headers
            '& .MuiDataGrid-columnHeader': {
                fontWeight: 600,
            },

            // Cells
            '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
            },

            // Row borders
            '& .MuiDataGrid-row': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
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

            // Hover (mantém zebra visual consistente)
            '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },

            // Status rows (sobrescrevem zebra)
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
},
});