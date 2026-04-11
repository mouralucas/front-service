import { Theme } from '@mui/material/styles';
import { getMuiCssBaseline } from './MuiCssBaseline';
import { getMuiOutlinedInput } from './MuiOutlinedInput';
import { getMuiListItemIcon } from './MuiListItemIcon';
import { getMuiPaginationItem } from './MuiPaginationItem';
import { getMuiFormControlLabel } from './MuiFormControlLabel';
import { getMuiChip } from './MuiChip';
import { getMuiDataGrid } from './MuiDataGrid';

// export {
//     MuiCssBaseline,
//     MuiOutlinedInput,
//     MuiListItemIcon,
//     MuiPaginationItem,
//     MuiFormControlLabel,
//     MuiChip,
//     MuiDataGrid,
// };

export const getComponentsConfig = (theme: Theme) => ({
    MuiCssBaseline: getMuiCssBaseline(theme),
    MuiOutlinedInput: getMuiOutlinedInput(theme),
    MuiListItemIcon: getMuiListItemIcon(theme),
    MuiPaginationItem: getMuiPaginationItem(theme),
    MuiFormControlLabel: getMuiFormControlLabel(theme),
    MuiChip: getMuiChip(theme),
    MuiDataGrid: getMuiDataGrid(theme),
});
