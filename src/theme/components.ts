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
});