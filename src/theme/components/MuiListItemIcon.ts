import { Theme } from '@mui/material/styles';

export const getMuiListItemIcon = (_theme: Theme) => ({ // noqa: TS6133
    styleOverrides: {
        root: {
            minWidth: 24,
        },
    },
});
