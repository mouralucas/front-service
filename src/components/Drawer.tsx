import { ReactElement } from "react"
import SwipeableDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import '@/styles/components/drawer.css';

interface DrawerV2Props {
    isOpened: boolean;
    changePanelOpened: any;
    content: ReactElement;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    width?: number | string; // Width of the drawer, can be a number (in pixels) or a string (like '50%')
}

const DrawerV2 = (props: DrawerV2Props): ReactElement => {
    return (
        <SwipeableDrawer
            anchor={props.anchor || 'left'}
            open={props.isOpened}
            onClose={props.changePanelOpened}
        >
            <Box
                sx={{
                    width: props.width || 400,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {props.content}
            </Box>
        </SwipeableDrawer>
    )
}

export default DrawerV2;
