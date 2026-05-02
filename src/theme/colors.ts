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
  BLACK: '#000000',

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
  RED_GRADIENT: 'linear-gradient(135deg, #FFEAEA, #F28B82)',
  ORANGE_GRADIENT: 'linear-gradient(135deg, #FFF4E6, #FBCB8B)',
  YELLOW_GRADIENT: 'linear-gradient(135deg, #FFFDEA, #FFF2A1)',
  GREEN_GRADIENT: 'linear-gradient(135deg, #EAFBF6, #B5EAD7)',
  BLUE_GRADIENT: 'linear-gradient(135deg, #EAF1FA, #A7C7E7)',
  PURPLE_GRADIENT: 'linear-gradient(135deg, #F5EAF5, #CBAACB)',
  PINK_GRADIENT: 'linear-gradient(135deg, #FFF0F4, #FFD1DC)',
  BROWN_GRADIENT: 'linear-gradient(135deg, #FAF5EE, #E6CBA8)',
  GRAY_GRADIENT: 'linear-gradient(135deg, #F8F8F8, #E0E0E0)',
  WHITE_GRADIENT: 'linear-gradient(135deg, #FFFFFF, #FAFAFA)',
};


export const ColorPalette = {
  primary: {
    light: COLORS.BLUE_FOCUS,
    main: COLORS.BLUE,
    dark: COLORS.BLUE_HOVER,
    contrastText: COLORS.BLACK,
  },
  secondary: {
    light: COLORS.ORANGE_FOCUS,
    main: COLORS.ORANGE,
    dark: COLORS.ORANGE_HOVER,
    contrastText: COLORS.BLACK,
  },
  error: {
    light: COLORS.RED_FOCUS,
    main: COLORS.RED,
    dark: COLORS.RED_HOVER,
    contrastText: COLORS.BLACK,
  },
  success: {
    light: COLORS.GREEN_FOCUS,
    main: COLORS.GREEN,
    dark: COLORS.GREEN_HOVER,
    contrastText: COLORS.BLACK,
  },
  warning: {
    light: COLORS.RED_FOCUS,
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

  default: {
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

  hovers: {
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

  focus: {
    red: COLORS.RED_FOCUS,
    orange: COLORS.ORANGE_FOCUS,
    yellow: COLORS.YELLOW_FOCUS,
    green: COLORS.GREEN_FOCUS,
    blue: COLORS.BLUE_FOCUS,
    purple: COLORS.PURPLE_FOCUS,
    pink: COLORS.PINK_FOCUS,
    brown: COLORS.BROWN_FOCUS,
    gray: COLORS.GRAY_FOCUS,
    white: COLORS.WHITE_FOCUS,
  },

  gradients: {
    red: COLORS.RED_GRADIENT,
    orange: COLORS.ORANGE_GRADIENT,
    yellow: COLORS.YELLOW_GRADIENT,
    green: COLORS.GREEN_GRADIENT,
    blue: COLORS.BLUE_GRADIENT,
    purple: COLORS.PURPLE_GRADIENT,
    pink: COLORS.PINK_GRADIENT,
    brown: COLORS.BROWN_GRADIENT,
    gray: COLORS.GRAY_GRADIENT,
    white: COLORS.WHITE_GRADIENT,
  },
};