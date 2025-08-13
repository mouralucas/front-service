import { ReactElement } from "react"
import SwipeableDrawer from "@mui/material/Drawer"


interface DrawerV2Props {
    isOpened: boolean;
    changePanelOpened: any;
    content: ReactElement;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
}


const DrawerV2 = (props: DrawerV2Props): ReactElement => {
    return (
        <div>
            <SwipeableDrawer 
                anchor={props.anchor || 'left'}
                open={props.isOpened} 
                onClose={props.changePanelOpened}
            >
                {props.content}
            </SwipeableDrawer>
        </div>
    )
}

export default DrawerV2;