// colors.ts

export const COLORS = {
  // === BASE PASTEL ===
  PASTEL_RED: '#F28B82',
  PASTEL_ORANGE: '#FBCB8B',
  PASTEL_YELLOW: '#FFF2A1',
  PASTEL_GREEN: '#B5EAD7',
  PASTEL_BLUE: '#A7C7E7',
  PASTEL_PURPLE: '#CBAACB',
  PASTEL_PINK: '#FFD1DC',
  PASTEL_BROWN: '#E6CBA8',
  PASTEL_GRAY: '#E0E0E0',
  PASTEL_WHITE: '#FAFAFA',

  // === HOVER ===
  RED_HOVER: '#E0746B',
  ORANGE_HOVER: '#F0B873',
  YELLOW_HOVER: '#E8D98D',
  GREEN_HOVER: '#9FD1BE',
  BLUE_HOVER: '#8FAFD0',
  PURPLE_HOVER: '#B092B0',
  PINK_HOVER: '#E6B8C3',
  BROWN_HOVER: '#CCB08E',
  GRAY_HOVER: '#C7C7C7',
  WHITE_HOVER: '#E1E1E1',

  // === FOCUS ===
  RED_FOCUS: '#F5A29A',
  ORANGE_FOCUS: '#FCD7A1',
  YELLOW_FOCUS: '#FFF6B8',
  GREEN_FOCUS: '#C9F0E1',
  BLUE_FOCUS: '#BAD4ED',
  PURPLE_FOCUS: '#D8B9D8',
  PINK_FOCUS: '#FFDEE7',
  BROWN_FOCUS: '#ECD8BA',
  GRAY_FOCUS: '#EBEBEB',
  WHITE_FOCUS: '#FFFFFF',

  // === GRADIENTS ===
  GRADIENT_RED: 'linear-gradient(135deg, #FFEAEA, #F28B82)',
  GRADIENT_ORANGE: 'linear-gradient(135deg, #FFF4E6, #FBCB8B)',
  GRADIENT_YELLOW: 'linear-gradient(135deg, #FFFDEA, #FFF2A1)',
  GRADIENT_GREEN: 'linear-gradient(135deg, #EAFBF6, #B5EAD7)',
  GRADIENT_BLUE: 'linear-gradient(135deg, #EAF1FA, #A7C7E7)',
  GRADIENT_PURPLE: 'linear-gradient(135deg, #F5EAF5, #CBAACB)',
  GRADIENT_PINK: 'linear-gradient(135deg, #FFF0F4, #FFD1DC)',
  GRADIENT_BROWN: 'linear-gradient(135deg, #FAF5EE, #E6CBA8)',
  GRADIENT_GRAY: 'linear-gradient(135deg, #F8F8F8, #E0E0E0)',
  GRADIENT_WHITE: 'linear-gradient(135deg, #FFFFFF, #FAFAFA)',

  // === NEUTROS EXTRA ===
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};


// ✅ COMPATÍVEL COM MUI
export const ColorPalette = {
  primary: {
    light: COLORS.BLUE_FOCUS,
    main: COLORS.PASTEL_BLUE,
    dark: COLORS.BLUE_HOVER,
    contrastText: COLORS.BLACK,
  },
  secondary: {
    light: COLORS.ORANGE_FOCUS,
    main: COLORS.PASTEL_ORANGE,
    dark: COLORS.ORANGE_HOVER,
    contrastText: COLORS.BLACK,
  },
  error: {
    light: COLORS.RED_FOCUS,
    main: COLORS.PASTEL_RED,
    dark: COLORS.RED_HOVER,
    contrastText: COLORS.BLACK,
  },
  success: {
    light: COLORS.GREEN_FOCUS,
    main: COLORS.PASTEL_GREEN,
    dark: COLORS.GREEN_HOVER,
    contrastText: COLORS.BLACK,
  },
  warning: {
    light: COLORS.YELLOW_FOCUS,
    main: COLORS.PASTEL_YELLOW,
    dark: COLORS.YELLOW_HOVER,
    contrastText: COLORS.BLACK,
  },

  // 🔥 CORRIGIDO (MUI precisa disso assim)
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#C7C7C7',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // 🔥 CORRIGIDO
  background: {
    default: COLORS.PASTEL_WHITE,
    paper: COLORS.WHITE,
  },

  text: {
    primary: COLORS.BLACK,
    secondary: '#616161',
    disabled: '#9E9E9E',
  },

  divider: '#E0E0E0',

  // === CUSTOM (mantidos) ===
  pastel: {
    red: COLORS.PASTEL_RED,
    orange: COLORS.PASTEL_ORANGE,
    yellow: COLORS.PASTEL_YELLOW,
    green: COLORS.PASTEL_GREEN,
    blue: COLORS.PASTEL_BLUE,
    purple: COLORS.PASTEL_PURPLE,
    pink: COLORS.PASTEL_PINK,
    brown: COLORS.PASTEL_BROWN,
    gray: COLORS.PASTEL_GRAY,
    white: COLORS.PASTEL_WHITE,
  },

  gradients: {
    red: COLORS.GRADIENT_RED,
    orange: COLORS.GRADIENT_ORANGE,
    yellow: COLORS.GRADIENT_YELLOW,
    green: COLORS.GRADIENT_GREEN,
    blue: COLORS.GRADIENT_BLUE,
    purple: COLORS.GRADIENT_PURPLE,
    pink: COLORS.GRADIENT_PINK,
    brown: COLORS.GRADIENT_BROWN,
    gray: COLORS.GRADIENT_GRAY,
    white: COLORS.GRADIENT_WHITE,
  },
};