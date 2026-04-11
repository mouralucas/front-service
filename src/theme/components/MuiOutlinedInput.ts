import { Theme } from '@mui/material/styles';

export const getMuiOutlinedInput = (theme: Theme) => ({
    styleOverrides: {
        notchedOutline: {
            border: `1px solid ${theme.palette.action.disabled}`,
        },
    },
});
