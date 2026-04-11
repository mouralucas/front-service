import { Theme } from '@mui/material/styles';

export const getMuiPaginationItem = (theme: Theme) => ({
    styleOverrides: {
        root: {
            border: 'none',
        },
        previousNext: {
            border: `1px solid ${theme.palette.action.disabled}`,
        },
    },
});
