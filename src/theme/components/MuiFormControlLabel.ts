import { Theme } from '@mui/material/styles';
import TypographyTheme from '../typography';


export const getMuiFormControlLabel = (theme: Theme) => ({
    styleOverrides: {
        label: {
            ...TypographyTheme.body1,
            color: theme.palette.text.primary,
        },
    },
});
