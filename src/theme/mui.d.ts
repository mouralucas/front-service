import { CSSProperties } from 'react';
import { ColorPalette } from './colors';

declare module '@mui/material/styles' {
  interface Palette {
    default: typeof ColorPalette.default;
    hovers: typeof ColorPalette.hovers;
    focus: typeof ColorPalette.focus;
    gradients: typeof ColorPalette.gradients;
  }

  interface PaletteOptions {
    pastel?: typeof ColorPalette.default;
    gradients?: typeof ColorPalette.gradients;
  }

  // 👇 Typography custom
  interface TypographyVariants {
    body3: CSSProperties;
    body4: CSSProperties;
    body5: CSSProperties;
    caption1: CSSProperties;
    caption2: CSSProperties;
    italic: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: CSSProperties;
    body4?: CSSProperties;
    body5?: CSSProperties;
    caption1?: CSSProperties;
    caption2?: CSSProperties;
    italic?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
    caption1: true;
    caption2: true;
    italic: true;
  }
}