import { Theme } from '@mui/material/styles';

export const getMuiChip = (theme: Theme) => ({
    variants: [
        {
            props: { variant: "danger" as any },
            style: {
                backgroundColor: theme.palette.pastel.red,
                "& .MuiChip-label": {
                    color: theme.palette.pastel.white,
                },
            },
        },
    ],
});
