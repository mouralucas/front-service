import { Theme } from '@mui/material/styles';
import { getComponentsConfig } from './components/index';

export const getComponents = (theme: Theme) => getComponentsConfig(theme);