import TypographyTheme from '../typography';
import { COLORS } from '../colors';
import { Theme } from '@mui/material/styles';


export const getMuiFormControlLabel = (theme: Theme) => ({
    styleOverrides: {
        label: {
            ...TypographyTheme.body1_lato,
            color: COLORS.BLACK,
        },
    },
});
