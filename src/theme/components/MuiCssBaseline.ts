import { Theme } from '@mui/material/styles';
import { getCssVariables } from '../tokens';

export const getMuiCssBaseline = (theme: Theme) => ({
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
});
