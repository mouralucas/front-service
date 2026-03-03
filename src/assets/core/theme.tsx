import { ZIndex, createTheme } from '@mui/material/styles';

import { ColorPalette } from './colors';
import TypographyTheme from './typography';


interface MyZIndex extends ZIndex {
    backdrop: number;
    floatingElements: number;
    sidebar: number;
    verification: number;
}

const spacingScale = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 64, 128, 256, 512];

const theme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: { xs: 0, sm: 640, md: 832, lg: 1224, xl: 1500 },
    },
    space: spacingScale,
    spacing: (factor: number) => {
        // Handle integer indices by returning from the scale array
        if (Number.isInteger(factor) && factor >= 0 && factor < spacingScale.length) {
            return `${spacingScale[factor]}px`;
        }
        // Handle fractional values by interpolating
        return `${factor * 8}px`;
    },
    palette: ColorPalette as any,
    zIndex: {
        backdrop: 100,
        modal: 1300,
        floatingElements: 20,
        sidebar: 50,
        verification: 111,
    } as MyZIndex,
    borders: {
        separator: '1px solid rgba(97, 99, 112, 0.1);',
        activeText: '1px solid #3248FF',
        light: 'solid 1px #d9d9d9',
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Lato, "Helvetica Neue", sans-serif',
        heading: 'Lato, sans-serif',
        lato: 'Lato, sans-serif',
        poppins: 'Poppins, sans-serif',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 18, 20, 24, 30, 32, 48, 64, 96],
    typography: TypographyTheme as any,
    components: {
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
        // @ts-expect-error - Não existe em Components, mas vamos sobrescrever mesmo assim
        MuiClockPicker: {
            styleOverrides: {
                arrowSwitcher: {
                    '& + div': {
                        paddingBottom: '70px',
                    },
                },
            },
        } as any,
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    ...TypographyTheme.body1_lato,
                    color: 'black',
                },
            },
        },


        // Custom theme styles
        MuiChip: {
            variants: [
                {
                    props: { variant: "danger" as any },
                    style: {
                        backgroundColor: "var(--red-pastel)", // fundo
                        //border: "1px solid var(--black)", // borda
                        "& .MuiChip-label": {
                            color: "var(--white)",
                        },
                        //"&:hover": {
                        //    backgroundColor: "var(--black)",
                        //},
                        //"&:active": {
                        //    backgroundColor: "var(--red-dark)",
                        //},
                        //"&.MuiChip-clickable.MuiChip-selected": {
                        //    backgroundColor: "var(--red-dark)",
                        //    "& .MuiChip-label": {
                        //        color: "#fff",
                        //    },
                        //},
                    },
                },
            ],
        },
    },
});

export default theme;