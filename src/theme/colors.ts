// colors.ts

export const COLORS = {
  // === BASE PASTEL ===
  RED: '#F28B82',
  ORANGE: '#FBCB8B',
  YELLOW: '#FFF2A1',
  GREEN: '#B5EAD7',
  BLUE: '#A7C7E7',
  PURPLE: '#CBAACB',
  PINK: '#FFD1DC',
  BROWN: '#E6CBA8',
  GRAY: '#E0E0E0',
  WHITE: '#FAFAFA',

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
  PASTEL_RED_FOCUS: '#F5A29A',
  PASTEL_ORANGE_FOCUS: '#FCD7A1',
  PASTEL_YELLOW_FOCUS: '#FFF6B8',
  PASTEL_GREEN_FOCUS: '#C9F0E1',
  PASTEL_BLUE_FOCUS: '#BAD4ED',
  PASTEL_PURPLE_FOCUS: '#D8B9D8',
  PASTEL_PINK_FOCUS: '#FFDEE7',
  PASTEL_BROWN_FOCUS: '#ECD8BA',
  PASTEL_GRAY_FOCUS: '#EBEBEB',
  PASTEL_WHITE_FOCUS: '#FFFFFF',

  // === GRADIENTS ===
  PASTEL_RED_GRADIENT: 'linear-gradient(135deg, #FFEAEA, #F28B82)',
  PASTEL_ORANGE_GRADIENT: 'linear-gradient(135deg, #FFF4E6, #FBCB8B)',
  PASTEL_YELLOW_GRADIENT: 'linear-gradient(135deg, #FFFDEA, #FFF2A1)',
  PASTEL_GREEN_GRADIENT: 'linear-gradient(135deg, #EAFBF6, #B5EAD7)',
  PASTEL_BLUE_GRADIENT: 'linear-gradient(135deg, #EAF1FA, #A7C7E7)',
  PASTEL_PURPLE_GRADIENT: 'linear-gradient(135deg, #F5EAF5, #CBAACB)',
  PASTEL_PINK_GRADIENT: 'linear-gradient(135deg, #FFF0F4, #FFD1DC)',
  PASTEL_BROWN_GRADIENT: 'linear-gradient(135deg, #FAF5EE, #E6CBA8)',
  PASTEL_GRAY_GRADIENT: 'linear-gradient(135deg, #F8F8F8, #E0E0E0)',
  PASTEL__WHITE_GRADIENT: 'linear-gradient(135deg, #FFFFFF, #FAFAFA)',

  BLACK: '#000000',
  // WHITE: '#FFFFFF',
};


export const ColorPalette = {
  primary: {
    light: COLORS.PASTEL_BLUE_FOCUS,
    main: COLORS.BLUE,
    dark: COLORS.BLUE_HOVER,
    contrastText: COLORS.BLACK,
  },
  secondary: {
    light: COLORS.PASTEL_ORANGE_FOCUS,
    main: COLORS.ORANGE,
    dark: COLORS.ORANGE_HOVER,
    contrastText: COLORS.BLACK,
  },
  error: {
    light: COLORS.PASTEL_RED_FOCUS,
    main: COLORS.RED,
    dark: COLORS.RED_HOVER,
    contrastText: COLORS.BLACK,
  },
  success: {
    light: COLORS.PASTEL_GREEN_FOCUS,
    main: COLORS.GREEN,
    dark: COLORS.GREEN_HOVER,
    contrastText: COLORS.BLACK,
  },
  warning: {
    light: COLORS.PASTEL_RED_FOCUS,
    main: COLORS.RED,
    dark: COLORS.RED_HOVER,
    contrastText: COLORS.BLACK,
  },

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

  white: COLORS.WHITE,

  background: {
    default: COLORS.WHITE,
    paper: COLORS.WHITE,
  },

  text: {
    primary: COLORS.BLACK,
    secondary: '#616161',
    disabled: '#9E9E9E',
  },

  divider: '#E0E0E0',

  // === CUSTOM ===
  pastel: {
    red: COLORS.RED,
    orange: COLORS.ORANGE,
    yellow: COLORS.YELLOW,
    green: COLORS.GREEN,
    blue: COLORS.BLUE,
    purple: COLORS.PURPLE,
    pink: COLORS.PINK,
    brown: COLORS.BROWN,
    gray: COLORS.GRAY,
    white: COLORS.WHITE,
  },

  pastel_hover: {
    red: COLORS.RED_HOVER,
    orange: COLORS.ORANGE_HOVER,
    yellow: COLORS.YELLOW_HOVER,
    green: COLORS.GREEN_HOVER,
    blue: COLORS.BLUE_HOVER,
    purple: COLORS.PURPLE_HOVER,
    pink: COLORS.PINK_HOVER,
    brown: COLORS.BROWN_HOVER,
    gray: COLORS.GRAY_HOVER,
    white: COLORS.WHITE_HOVER,
  },

  gradients: {
    red: COLORS.PASTEL_RED_GRADIENT,
    orange: COLORS.PASTEL_ORANGE_GRADIENT,
    yellow: COLORS.PASTEL_YELLOW_GRADIENT,
    green: COLORS.PASTEL_GREEN_GRADIENT,
    blue: COLORS.PASTEL_BLUE_GRADIENT,
    purple: COLORS.PASTEL_PURPLE_GRADIENT,
    pink: COLORS.PASTEL_PINK_GRADIENT,
    brown: COLORS.PASTEL_BROWN_GRADIENT,
    gray: COLORS.PASTEL_GRAY_GRADIENT,
    white: COLORS.PASTEL__WHITE_GRADIENT,
  },
};