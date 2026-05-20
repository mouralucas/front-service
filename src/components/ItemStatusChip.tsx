import { Chip } from "@mui/material";
import theme from "../theme/theme";

// # TODO: add a list for available statuses. 
//  Have to change in all places that use these statuses

type Props = {
    label?: string | null;
    status?: string | null;
};

const statusColours = (itemStatus: string | undefined | null) => {
    switch (itemStatus) {
        case 'bought':
            return {
                bg: theme.palette.default.yellow,
                color: theme.palette.text.primary,
            };

        case 'owned':
            return {
                bg: theme.palette.default.gray,
                color: theme.palette.text.primary,
            };

        case 'lost':
            return {
                bg: theme.palette.default.red,
                color: theme.palette.text.primary,
            };

        case 'wished':
            return {
                bg: theme.palette.default.green,
                color: theme.palette.text.primary,
            };
        case 'ebook':
            return {
                bg: theme.palette.default.blue,
                color: theme.palette.text.primary,
            };
        default:
            return {
                bg: theme.palette.grey[200],
                color: theme.palette.text.primary,
            };
    }
}

export default function ItemStatusChip({ label, status }: Props) {
    const style = statusColours(status);

    return (
        <Chip
            label={label}
            size="small"
            variant="outlined"
            sx={{
                backgroundColor: style.bg,
                color: style.color,
                fontWeight: 500,
            }}
        />
    );
}