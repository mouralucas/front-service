import { Theme } from '@mui/material/styles';
import { getMuiChip } from './MuiChip';
import { getMuiCssBaseline } from './MuiCssBaseline';
import { getMuiDataGrid } from './MuiDataGrid';
import { getMuiFormControlLabel } from './MuiFormControlLabel';
import { getMuiListItemIcon } from './MuiListItemIcon';
import { getMuiOutlinedInput } from './MuiOutlinedInput';
import { getMuiPaginationItem } from './MuiPaginationItem';

export const getComponentsConfig = (theme: Theme) => ({
    MuiCssBaseline: getMuiCssBaseline(theme),
    MuiOutlinedInput: getMuiOutlinedInput(theme),
    MuiListItemIcon: getMuiListItemIcon(theme),
    MuiPaginationItem: getMuiPaginationItem(theme),
    MuiFormControlLabel: getMuiFormControlLabel(theme),
    MuiChip: getMuiChip(theme),
    MuiDataGrid: getMuiDataGrid(theme),
});
