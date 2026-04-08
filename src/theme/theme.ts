import { createTheme, ZIndex } from '@mui/material/styles';
import palette from './palette';
import TypographyTheme from './typography';
import { getComponents } from './components';

interface MyZIndex extends ZIndex {
  backdrop: number;
  floatingElements: number;
  sidebar: number;
  verification: number;
}

const spacingScale = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 64, 128, 256, 512];

// 🔥 1. Base theme
let theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: { xs: 0, sm: 640, md: 832, lg: 1224, xl: 1500 },
  },

  spacing: (factor: number) => {
    if (Number.isInteger(factor) && factor >= 0 && factor < spacingScale.length) {
      return `${spacingScale[factor]}px`;
    }
    return `${factor * 8}px`;
  },

  palette,

  zIndex: {
    backdrop: 100,
    modal: 1300,
    floatingElements: 20,
    sidebar: 50,
    verification: 111,
  } as MyZIndex,

  typography: TypographyTheme as any,
});

// 🔥 2. Inject components (agora com acesso ao theme)
theme = createTheme(theme, {
  components: getComponents(theme),
});

export default theme;