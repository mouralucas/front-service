import { Theme } from '@mui/material/styles';

export const getCssVariables = (theme: Theme) => ({
  ':root': {
    /* =========================
     * PRIMARY / SECONDARY
     * ========================= */
    '--color-primary': theme.palette.primary.main,
    '--color-primary-hover': theme.palette.primary.dark,
    '--color-primary-focus': theme.palette.primary.light,

    '--color-secondary': theme.palette.secondary.main,
    '--color-secondary-hover': theme.palette.secondary.dark,
    '--color-secondary-focus': theme.palette.secondary.light,

    /* =========================
     * BASE
     * ========================= */
    '--black': theme.palette.common.black,
    '--white': theme.palette.common.white,

    /* =========================
     * STATUS (MUI padrão)
     * ========================= */
    '--color-success': theme.palette.success.main,
    '--color-success-hover': theme.palette.success.dark,
    '--color-success-focus': theme.palette.success.light,

    '--color-error': theme.palette.error.main,
    '--color-error-hover': theme.palette.error.dark,
    '--color-error-focus': theme.palette.error.light,

    '--color-warning': theme.palette.warning.main,
    '--color-warning-hover': theme.palette.warning.dark,
    '--color-warning-focus': theme.palette.warning.light,

    /* =========================
     * PASTEL (CUSTOM)
     * ========================= */
    '--pastel-red': theme.palette.pastel.red,
    '--pastel-orange': theme.palette.pastel.orange,
    '--pastel-yellow': theme.palette.pastel.yellow,
    '--pastel-green': theme.palette.pastel.green,
    '--pastel-blue': theme.palette.pastel.blue,
    '--pastel-purple': theme.palette.pastel.purple,
    '--pastel-pink': theme.palette.pastel.pink,
    '--pastel-brown': theme.palette.pastel.brown,
    '--pastel-gray': theme.palette.pastel.gray,
    '--pastel-white': theme.palette.pastel.white,

    /* =========================
     * GRADIENTS (CUSTOM)
     * ========================= */
    '--gradient-red': theme.palette.gradients.red,
    '--gradient-orange': theme.palette.gradients.orange,
    '--gradient-yellow': theme.palette.gradients.yellow,
    '--gradient-green': theme.palette.gradients.green,
    '--gradient-blue': theme.palette.gradients.blue,
    '--gradient-purple': theme.palette.gradients.purple,
    '--gradient-pink': theme.palette.gradients.pink,
    '--gradient-brown': theme.palette.gradients.brown,
    '--gradient-gray': theme.palette.gradients.gray,
    '--gradient-white': theme.palette.gradients.white,

    /* =========================
     * TEXT
     * ========================= */
    '--text-primary': theme.palette.text.primary,
    '--text-secondary': theme.palette.text.secondary,
    '--text-disabled': theme.palette.text.disabled,

    /* =========================
     * BACKGROUND
     * ========================= */
    '--background-default': theme.palette.background.default,
    '--background-paper': theme.palette.background.paper,

    /* =========================
     * BORDER / DIVIDER
     * ========================= */
    '--divider': theme.palette.divider,
    '--line-color': theme.palette.divider,
  },
});