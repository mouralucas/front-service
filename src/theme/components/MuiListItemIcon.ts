import { Theme } from '@mui/material/styles'

export const getMuiListItemIcon = (theme: Theme) => ({
    styleOverrides: {
        root: {
            minWidth: 24,
        },
    },
});
